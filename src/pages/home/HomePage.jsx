import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              Your Personal
              <br />
              <span className="gradient-text">Health Operating System</span>
            </h1>
            <p className="hero-subtitle">
              Pahami body type Anda. Bangun kebiasaan yang sustainable. 
              Transform dalam 90 hari dengan AI-powered insights yang explainable.
            </p>
            <div className="hero-cta">
              <Link to="/apps/onboarding">
                <Button size="lg" fullWidth>
                  Mulai Journey Anda ✨
                </Button>
              </Link>
              <p className="hero-note">
                ⏱️ Onboarding hanya 5 menit • 🔒 Data 100% private
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="visual-card">
              <div className="visual-emoji">🧬</div>
              <div className="visual-text">Body Type is the Kernel</div>
            </div>
            <div className="visual-card">
              <div className="visual-emoji">🔄</div>
              <div className="visual-text">Habit is the Process</div>
            </div>
            <div className="visual-card">
              <div className="visual-emoji">✨</div>
              <div className="visual-text">Result is the Output</div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">Bagaimana Beautycode Bekerja</h2>
          
          <div className="steps">
            <motion.div
              className="step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="step-number">01</div>
              <div className="step-icon">🔍</div>
              <h3>Identify Body Type</h3>
              <p>
                Kuesioner singkat untuk menentukan body type Anda sebagai biological kernel. 
                Bukan diagnosis, tapi framework untuk understanding.
              </p>
            </motion.div>
            
            <motion.div
              className="step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="step-number">02</div>
              <div className="step-icon">🎯</div>
              <h3>Personalized Habits</h3>
              <p>
                Sistem generate daily habits yang disesuaikan dengan body type: 
                sleep, nutrition, movement, recovery, emotional regulation.
              </p>
            </motion.div>
            
            <motion.div
              className="step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="step-number">03</div>
              <div className="step-icon">📊</div>
              <h3>Track & Adapt</h3>
              <p>
                Daily log hanya 60 detik. Sistem analyze patterns dan 
                berikan insights yang actionable dan explainable.
              </p>
            </motion.div>
            
            <motion.div
              className="step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="step-number">04</div>
              <div className="step-icon">🌟</div>
              <h3>Transform in 90 Days</h3>
              <p>
                Habit compound over time. Weekly insights menunjukkan progress 
                dan help Anda stay on track dengan gentle reminders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Body Types Overview */}
      <section className="body-types">
        <div className="container">
          <h2 className="section-title">4 Body Types Framework</h2>
          <p className="section-subtitle">
            Setiap body type memiliki karakteristik unik yang mempengaruhi 
            bagaimana tubuh merespon makanan, stress, dan exercise.
          </p>
          
          <div className="types-grid">
            <motion.div
              className="type-card type-red"
              whileHover={{ y: -8 }}
            >
              <div className="type-emoji">🔴</div>
              <h3>Red Type</h3>
              <p className="type-subtitle">Metabolic-Sensitive</p>
              <ul className="type-features">
                <li>Insulin resistance tendency</li>
                <li>Carb-sensitive</li>
                <li>Weight gain di area perut</li>
                <li>Energy drop setelah meals</li>
              </ul>
            </motion.div>
            
            <motion.div
              className="type-card type-blue"
              whileHover={{ y: -8 }}
            >
              <div className="type-emoji">🔵</div>
              <h3>Blue Type</h3>
              <p className="type-subtitle">Stress-Driven</p>
              <ul className="type-features">
                <li>Cortisol-sensitive</li>
                <li>Chronic fatigue</li>
                <li>Sleep quality issues</li>
                <li>Stress eating patterns</li>
              </ul>
            </motion.div>
            
            <motion.div
              className="type-card type-green"
              whileHover={{ y: -8 }}
            >
              <div className="type-emoji">🟢</div>
              <h3>Green Type</h3>
              <p className="type-subtitle">Inflammation-Prone</p>
              <ul className="type-features">
                <li>Digestive-sensitive</li>
                <li>Food sensitivities</li>
                <li>Skin reactivity</li>
                <li>Joint/muscle pain</li>
              </ul>
            </motion.div>
            
            <motion.div
              className="type-card type-yellow"
              whileHover={{ y: -8 }}
            >
              <div className="type-emoji">🟡</div>
              <h3>Yellow Type</h3>
              <p className="type-subtitle">Hormonally-Driven</p>
              <ul className="type-features">
                <li>Cycle-sensitive</li>
                <li>Mood fluctuations</li>
                <li>Energy varies by phase</li>
                <li>Water retention</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Token Economy */}
      <section className="token-economy">
        <div className="container">
          <h2 className="section-title">V. Token Economy (Engagement + Flexibility)</h2>
          <p className="section-subtitle">
            Token menjadi penghubung antara engagement user dan pertumbuhan bisnis:
            terasa fleksibel untuk pengguna, tetap sustain untuk platform.
          </p>

          <div className="token-grid">
            <motion.div
              className="token-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>Fungsi Token</h3>
              <ul>
                <li>Mata uang internal</li>
                <li>Mengurangi “rasa bayar”</li>
                <li>Memberi rasa progres</li>
              </ul>
            </motion.div>

            <motion.div
              className="token-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3>Cara Dapat Token</h3>
              <ul>
                <li>Aktivitas & konsistensi</li>
                <li>Sharing / referral</li>
                <li>Subscription bonus</li>
                <li>Top-up langsung</li>
              </ul>
            </motion.div>

            <motion.div
              className="token-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>Penggunaan Token</h3>
              <ul>
                <li>Unlock fitur</li>
                <li>Konsultasi</li>
                <li>Produk digital</li>
                <li>Program khusus</li>
              </ul>
            </motion.div>

            <motion.div
              className="token-card token-value"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3>Nilai Bisnis</h3>
              <ul>
                <li>Gamified retention</li>
                <li>Lower churn</li>
                <li>Higher LTV</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Disclaimer */}
      <section className="disclaimer">
        <div className="container">
          <div className="disclaimer-card">
            <div className="disclaimer-icon">⚠️</div>
            <h3>Important: Medical Disclaimer</h3>
            <div className="disclaimer-content">
              <p>
                Beautycode adalah decision-support system untuk membantu Anda 
                memahami body patterns dan membangun healthy habits.
              </p>
              <ul>
                <li>❌ Bukan diagnosis medis</li>
                <li>❌ Tidak merekomendasikan obat atau treatment</li>
                <li>❌ Tidak menggantikan konsultasi dengan healthcare professional</li>
              </ul>
              <p>
                Jika Anda memiliki kondisi medis atau concerns, selalu konsultasi 
                dengan dokter atau healthcare provider terlebih dahulu.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Build Your Health OS?</h2>
            <p>Join ribuan orang yang sudah transform habits mereka</p>
            <Link to="/apps/onboarding">
              <Button size="lg">
                Start Your 90-Day Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 Beautycode. Your Personal Health Operating System.</p>
          <p className="footer-note">
            Built with 💜 for sustainable health transformation
          </p>
        </div>
      </footer>
    </div>
  )
}
