<template>
  <section class="hero-section">
    <v-container style="max-width: 1024px; width: 100%;">
      <v-row align="center" class="py-8">

        <v-col cols="12" md="6">
          <div class="hero-text">
            <p class="section-label">Hola, soy</p>
            <h1 style="font-size: clamp(2.25rem, 6vw, 3.75rem); font-weight: 700; line-height: 1.15;">
              <span class="gradient-text">Fabrizio Biondi</span>
            </h1>
            <p style="font-size: 1.25rem; color: #cbd5e1; font-weight: 300;">
              Analista de sistemas
            </p>
            <p style="color: #94a3b8; line-height: 1.7; max-width: 28rem;">
              Estudiante en IUA Córdoba. Busco nuevos desafíos en desarrollo
              de software donde pueda seguir aprendiendo y aportar valor real.
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
          <div class="profile-wrapper">
            <div class="profile-glow" />
            <div
              class="profile-ring"
              role="img"
              aria-label="Fabrizio Biondi"
            />
          </div>
        </v-col>

      </v-row>
    </v-container>

    <!-- Indicador scroll -->
    <a href="#sobre-mi" class="scroll-hint" aria-label="Deslizá hacia abajo">
      <span class="scroll-hint__text">Deslizá</span>
      <ChevronDown :size="20" class="scroll-hint__icon" />
    </a>
  </section>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'
</script>

<style scoped>
.hero-section {
  min-height: calc(100vh - 64px); /* v-main ya suma el offset del app-bar */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-inline: 1.5rem;
  position: relative;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeInUp 0.7s ease both;
}

.profile-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  animation: fadeInScale 0.7s ease 0.2s both;
}
@media (max-width: 600px) {
  .hero-section  { padding-bottom: 5rem; }
  .profile-wrapper { width: 200px; height: 200px; }
}
@media (min-width: 768px) {
  .profile-wrapper { width: 320px; height: 320px; }
}

.profile-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,180,216,0.2), rgba(0,150,199,0.1));
  filter: blur(2rem);
}
.profile-ring {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--accent);
  background-image: url('/profile.jpg');
  background-size: cover;
  background-position: center top;
  background-color: var(--navy-light);
}

/* Scroll hint — centrado con left/right/margin para no interferir con transform de la animación */
.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: #64748b;
  text-decoration: none;
  opacity: 0;
  animation: fadeIn 0.6s ease 1s forwards;
  transition: color 0.2s;
}
.scroll-hint:hover { color: var(--accent); }
.scroll-hint__text {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.scroll-hint__icon {
  animation: bounce 1.8s ease-in-out 1.6s infinite;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}
</style>
