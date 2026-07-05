import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Heart, Users, Globe, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import './About.css';

const values = [
  { icon: <Heart size={24} />, title: 'Care First', desc: 'Every decision we make starts with asking: is this the best for our customers? We put people before profit, always.' },
  { icon: <Award size={24} />, title: 'Quality You Can Trust', desc: 'We rigorously test every product before it reaches our range. If we wouldn\'t recommend it to our own family, we don\'t sell it.' },
  { icon: <Users size={24} />, title: 'Expert Knowledge', desc: 'Our team includes trained mobility specialists, physiotherapists, and occupational therapists to give you the best possible advice.' },
  { icon: <Globe size={24} />, title: 'UK-Wide Support', desc: 'From the Scottish Highlands to Cornwall, our network of technicians and service partners has you covered, wherever you are.' },
];

const teamMembers = [
  { name: 'Sarah Mitchell', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', bio: 'Former occupational therapist with 25 years of experience helping people maintain their independence.' },
  { name: 'James Carter', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', bio: 'Mobility engineer who has designed and tested over 200 scooter models throughout his career.' },
  { name: 'Helen Davies', role: 'Customer Care Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', bio: 'Dedicated to making sure every customer feels heard, valued, and supported long after their purchase.' },
  { name: 'David Park', role: 'Head of Service', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', bio: 'Leads our nationwide network of technicians, ensuring fast and reliable service for every customer.' },
];

const milestones = [
  { year: '2004', event: 'Care Drive Enclosed Mobility founded in Leeds by Sarah Mitchell' },
  { year: '2008', event: 'Expanded to 3 showrooms and launched our first service plan' },
  { year: '2012', event: 'Recognised by Which? as a Recommended Provider' },
  { year: '2016', event: 'Launched our nationwide mobile service network' },
  { year: '2020', event: 'Reached 15,000 customers across the UK' },
  { year: '2024', event: 'Winner: Mobility & Access Awards — Best Customer Service' },
];

export default function About() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>About Us</span></nav>
          <h1>About Care Drive Enclosed Mobility</h1>
          <p>Over 20 years of helping people across the UK stay independent, active, and mobile. Our story, our team, our values.</p>
        </div>
      </div>

      {/* Mission */}
      <section className="section about-mission">
        <div className="container">
          <div className="about-mission-inner">
            <motion.div
              className="about-mission-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Our Mission</span>
              <h2 className="section-title">We Believe Everyone Deserves to Move Freely</h2>
              <p>Care Drive Enclosed Mobility was founded in 2004 with a single purpose: to help people maintain their independence and quality of life, no matter their mobility challenges. We're not just selling scooters — we're giving people the freedom to visit family, explore their community, and live life on their own terms.</p>
              <p style={{ marginTop: 16 }}>Today, we've helped over 20,000 customers across the UK find the right mobility solution, and we're as passionate about it as we were on day one.</p>
              <div className="about-stats-row">
                {[
                  { value: '20,000+', label: 'Customers helped' },
                  { value: '20 yrs', label: 'In business' },
                  { value: '98%', label: 'Satisfaction rate' },
                ].map(s => (
                  <div key={s.label} className="about-stat">
                    <div className="about-stat-value">{s.value}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="about-mission-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80" alt="Mobility specialist with a customer" />
              <div className="about-award-badge">
                <Award size={20} />
                <span>Award-Winning Service Since 2012</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid-2" style={{ gap: 28 }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="value-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="value-icon">{v.icon}</div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team">
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">The People Behind Care Drive</span>
            <h2 className="section-title">Meet Our Leadership Team</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Experienced professionals who are passionate about mobility, independence, and customer care.</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className="team-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="team-card-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <p>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section about-timeline" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">20 Years of Excellence</h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot"><CheckCircle size={16} /></div>
                <div className="timeline-event">{m.event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">Real Customer Stories</span>
            <h2 className="section-title">Don't Just Take Our Word For It</h2>
          </div>
          <div className="about-testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="about-testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="testimonial-stars-dark">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} fill={s <= t.rating ? '#f59e0b' : 'none'} color={s <= t.rating ? '#f59e0b' : '#d1d5db'} />
                  ))}
                </div>
                <p>"{t.text}"</p>
                <div className="about-testimonial-author">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <div className="testimonial-name-dark">{t.name}</div>
                    <div className="testimonial-meta-dark">{t.location} · {t.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: 32, marginBottom: 12 }}>Ready to find your perfect scooter?</h2>
          <p style={{ color: 'var(--color-gray-500)', marginBottom: 28, fontSize: 16 }}>
            Talk to one of our friendly experts today — no pressure, just honest advice.
          </p>
          <div className="flex-center gap-3">
            <Link to="/mobility-scooters" className="btn btn-primary btn-lg">Shop Scooters <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
