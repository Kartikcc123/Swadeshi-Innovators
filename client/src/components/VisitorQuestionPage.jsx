import { useEffect, useMemo, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  LoaderCircle,
  MessageCircle,
  Mic,
  MicOff,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Video,
} from 'lucide-react';
import { BRAND_CONFIG, DEMO_VIDEO_CONFIG } from '../data/websiteContent';

const FAQS = [
  {
    question: 'What is Weave Kiran?',
    answer: 'Weave Kiran is an AI-powered fabric inspection prototype that helps identify visible defects in woven fabric using computer vision.',
  },
  {
    question: 'How does the system detect fabric defects?',
    answer: 'A camera captures fabric images under controlled lighting, then the AI model checks them for defects such as stains, holes, and thread irregularities.',
  },
  {
    question: 'When will I receive my answer?',
    answer: 'Our team will reply to the WhatsApp number you provide as soon as we are free from the event visitors.',
  },
  {
    question: 'Will my contact details be shared?',
    answer: 'No. Your name and number are only used by the Swadeshi Innovators team to reply to your question.',
  },
];

export function VisitorQuestionPage() {
  const [form, setForm] = useState({ name: '', mobile: '', question: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  const recognitionRef = useRef(null);
  const questionBeforeVoiceRef = useRef('');
  const eventUrl = useMemo(
    () => import.meta.env.VITE_EVENT_QR_URL || `${window.location.origin}/visitor-question`,
    [],
  );
  const videoAvailable = Boolean(DEMO_VIDEO_CONFIG.videoUrl);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceNotice('Voice input is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    questionBeforeVoiceRef.current = form.question;
    setVoiceNotice('Listening… Speak your question clearly.');

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join('');
      setForm((current) => ({
        ...current,
        question: `${questionBeforeVoiceRef.current}${questionBeforeVoiceRef.current && transcript ? ' ' : ''}${transcript}`,
      }));
    };
    recognition.onerror = (event) => {
      setVoiceNotice(event.error === 'not-allowed'
        ? 'Microphone permission was not granted. Please type your question.'
        : 'Voice input could not be completed. Please type your question.');
    };
    recognition.onend = () => {
      setIsListening(false);
      setVoiceNotice((current) => current.startsWith('Listening') ? 'Voice note added. Please check it before submitting.' : current);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const response = await fetch('/api/visitor-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          question: form.question.trim(),
          source: voiceNotice.includes('Voice note added') ? 'voice' : 'typed',
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Unable to save your question right now.');

      setStatus({ state: 'success', message: data.message });
      setForm({ name: '', mobile: '', question: '' });
      setVoiceNotice('');
    } catch (error) {
      setStatus({ state: 'error', message: error.message || 'Unable to save your question right now.' });
    }
  };

  return (
    <main className="visitor-question-page">
      <header className="visitor-page-header">
        <a className="visitor-brand" href="/" aria-label="Go to Swadeshi Innovators home page">
          <img src="/assets/swadeshi_logo.png" alt="Swadeshi Innovators" />
          <span>Swadeshi Innovators</span>
        </a>
        <span className="visitor-event-badge"><Sparkles size={15} /> Event Question Desk</span>
      </header>

      <section className="visitor-hero">
        <div className="visitor-hero-copy">
          <span className="visitor-eyebrow">WELCOME TO OUR SHOWCASE</span>
          <h1>Watching the demo? Ask us anything.</h1>
          <p>
            We may be helping another visitor right now. Leave your question with your name and WhatsApp number;
            our team will send you a reply as soon as we are free.
          </p>
          <div className="visitor-promise"><MessageCircle size={18} /> Reply sent directly on WhatsApp</div>
        </div>

        <div className="visitor-video-card">
          <div className="visitor-video-frame">
            {videoAvailable ? (
              <iframe
                src={DEMO_VIDEO_CONFIG.videoUrl}
                title={DEMO_VIDEO_CONFIG.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img src={DEMO_VIDEO_CONFIG.placeholderPoster} alt="Weave Kiran prototype demonstration" />
                <div className="visitor-video-overlay"><Video size={28} /><span>Weave Kiran prototype demo</span></div>
              </>
            )}
          </div>
          <p><strong>Explore the demo</strong><br />{DEMO_VIDEO_CONFIG.caption}</p>
        </div>
      </section>

      <section className="visitor-question-layout" aria-label="Ask a question">
        <aside className="visitor-qr-card">
          <span className="visitor-qr-label">ON THE EVENT DISPLAY?</span>
          <h2>Scan to ask from your phone</h2>
          <div className="visitor-qr-code"><QRCodeSVG value={eventUrl} size={154} level="M" includeMargin /></div>
          <p>Open this page on your mobile, add your details, and we will respond on WhatsApp.</p>
          <span className="visitor-qr-url">{eventUrl}</span>
        </aside>

        <div className="visitor-form-card">
          <div className="visitor-form-heading">
            <div><CircleHelp size={22} /></div>
            <div><span>QUESTION BOX</span><h2>Leave your question</h2></div>
          </div>

          {status.state === 'success' ? (
            <div className="visitor-success" role="status">
              <CheckCircle2 size={36} />
              <h3>Question received</h3>
              <p>{status.message}</p>
              <button type="button" className="visitor-secondary-btn" onClick={() => setStatus({ state: 'idle', message: '' })}>Ask another question</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="visitor-form">
              {status.state === 'error' && <div className="visitor-form-error" role="alert">{status.message}</div>}
              <div className="visitor-two-columns">
                <label>Your name <span>*</span>
                  <input required maxLength="100" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Priya Sharma" />
                </label>
                <label><Phone size={15} /> WhatsApp mobile number <span>*</span>
                  <input required type="tel" inputMode="tel" pattern="[+0-9 -]{8,18}" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="e.g. 98765 43210" />
                </label>
              </div>
              <label className="visitor-question-label">Your question <span>*</span>
                <div className="visitor-textarea-wrap">
                  <textarea required maxLength="2000" rows="5" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Type your question here, or use the microphone…" />
                  <button type="button" className={`visitor-mic-btn ${isListening ? 'is-listening' : ''}`} onClick={startVoiceInput} aria-label={isListening ? 'Stop voice input' : 'Start voice input'} title={isListening ? 'Stop listening' : 'Speak your question'}>
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                </div>
              </label>
              <div className="visitor-voice-hint"><Mic size={15} /> {voiceNotice || 'Prefer speaking? Tap the microphone and say your question.'}</div>
              <button className="visitor-submit-btn" type="submit" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? <><LoaderCircle className="spin" size={18} /> Saving question…</> : <><span>Submit my question</span><Send size={17} /></>}
              </button>
              <p className="visitor-privacy"><ShieldCheck size={15} /> Your contact details are only used to send your WhatsApp reply.</p>
            </form>
          )}
        </div>
      </section>

      <section className="visitor-faq-section" aria-labelledby="visitor-faq-title">
        <div><span className="visitor-eyebrow">QUICK ANSWERS</span><h2 id="visitor-faq-title">Frequently asked questions</h2></div>
        <div className="visitor-faq-list">
          {FAQS.map((faq, index) => (
            <div className={`visitor-faq-item ${openFaq === index ? 'is-open' : ''}`} key={faq.question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                <span>{faq.question}</span><ChevronDown size={20} />
              </button>
              {openFaq === index && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer className="visitor-page-footer">© {new Date().getFullYear()} {BRAND_CONFIG.teamName} · {BRAND_CONFIG.productName}</footer>
    </main>
  );
}
