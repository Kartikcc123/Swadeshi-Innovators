import { Award, Users } from 'lucide-react';
import { TEAM_MEMBERS, BRAND_CONFIG } from '../data/websiteContent';

export function TeamSection() {
  return (
    <section className="section team-section" id="team" aria-labelledby="team-title">
      <div className="page-grid">
        <div className="section-head text-center">
          <div className="team-badge">
            <Users size={15} />
            <span>SWADESHI INNOVATORS • {BRAND_CONFIG.competition}</span>
          </div>
          <h2 id="team-title" className="section-title">
            The Team Behind Weave Kiran
          </h2>
          <p className="section-lead max-w-720 mx-auto">
            We are an innovation team of engineering students and researchers developing practical, affordable computer
            vision technology for India’s textile ecosystem, participating in Sanrachna IQTSX 2026.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="team-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-avatar-box">
                <div className="team-avatar-initials" aria-hidden="true">
                  <span>{member.initials}</span>
                </div>
                <div className="team-role-pill">
                  <span>{member.role}</span>
                </div>
              </div>

              <div className="team-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-desc">{member.contribution}</p>

                {/* Skill Badges */}
                <div className="team-skills-list">
                  {member.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="team-skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Ethos & Competition Acknowledgment */}
        <div className="team-ethos-card">
          <div className="ethos-left">
            <Award size={22} className="text-saffron flex-shrink-0" />
            <div>
              <strong>Sanrachna IQTSX 2026 Entry</strong>
              <p>
                Representing student innovation in textile quality inspection, resource conservation, and self-reliant
                manufacturing (Aatmanirbhar Bharat).
              </p>
            </div>
          </div>
          <div className="ethos-right">
            <a href="#contact" className="btn btn-outline btn-sm">
              <span>Connect with Our Team</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
