<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background: var(--navy);">
    <TheNavbar />
    <v-main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <JobSearchSection />
      <ContactSection />
    </v-main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from '../components/TheNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import JobSearchSection from '../components/JobSearchSection.vue'
import ContactSection from '../components/ContactSection.vue'
import TheFooter from '../components/TheFooter.vue'
</script>
