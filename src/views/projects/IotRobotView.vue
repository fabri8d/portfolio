<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background: var(--navy);">
    <TheNavbar />
    <v-main>
      <ProjectHeader
        title="Pepe — Robot para el monitoreo de Aire"
        tagline="Robot doméstico autónomo con pipeline de datos en tiempo real: sensores de aire, alertas Telegram, dashboards Grafana y navegación reactiva con ML."
        :tags="tags"
      />

      <v-container style="max-width: 1024px; padding: 4rem 1.5rem;" class="d-flex flex-column ga-16">

        <!-- Descripción general -->
        <section class="d-flex flex-column ga-4">
          <p class="section-label">El proyecto</p>
          <h2 class="section-h2">Dos ejes, un sistema</h2>
          <div class="two-col-text">
            <p class="body-text">
              Por un lado, <strong class="hl">Pepe</strong> es un robot físico 2WD que navega de
              forma reactiva usando un modelo MLP entrenado en Python, tomando decisiones en tiempo
              real a partir de sus sensores ultrasónicos.
            </p>
            <p class="body-text">
              Por otro, es un <strong class="hl">sistema completo de monitoreo de calidad de aire</strong>
              en ambientes cerrados: registro histórico en PostgreSQL, alertas automáticas por Telegram,
              reportes diarios y semanales, y dashboards Grafana accesibles públicamente desde la nube.
            </p>
          </div>
        </section>

        <!-- Foto del robot -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">El robot</p>
          <h2 class="section-h2">Conocé a Pepe</h2>
          <div class="robot-showcase">
            <div class="robot-photo-slot">
              <div class="robot-slider">
                <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                  <img
                    v-for="(src, i) in robotImages"
                    :key="i"
                    :src="src"
                    :alt="`Robot Pepe — foto ${i + 1}`"
                    class="slide-img zoomable"
                    @click="openLightbox(src)"
                  />
                </div>
                <button class="slider-btn slider-prev" :disabled="currentSlide === 0" @click="prevSlide">‹</button>
                <button class="slider-btn slider-next" :disabled="currentSlide === robotImages.length - 1" @click="nextSlide">›</button>
                <div class="slider-dots">
                  <span
                    v-for="(_, i) in robotImages"
                    :key="i"
                    class="slider-dot"
                    :class="{ active: i === currentSlide }"
                    @click="currentSlide = i"
                  />
                </div>
              </div>
            </div>
            <div class="robot-specs">
              <div v-for="spec in robotSpecs" :key="spec.label" class="robot-spec-item">
                <span class="spec-dot" />
                <div>
                  <span class="spec-label">{{ spec.label }}:&nbsp;</span>
                  <span class="spec-value">{{ spec.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Hardware -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Hardware</p>
          <h2 class="section-h2">Componentes del robot</h2>
          <v-row>
            <v-col v-for="hw in hardware" :key="hw.name" cols="12" sm="6" md="4">
              <div class="dark-card hw-card">
                <div class="hw-icon">{{ hw.icon }}</div>
                <div>
                  <p class="hw-name">{{ hw.name }}</p>
                  <p class="hw-desc">{{ hw.desc }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </section>

        <!-- Firmware -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Firmware</p>
          <h2 class="section-h2">FreeRTOS</h2>
          <p class="body-text">
            El ESP32 corre C++ con PlatformIO. La concurrencia está resuelta con
            <span class="mono">QueueHandle_t</span> entre tareas; cada una tiene su core y prioridad asignados.
          </p>
          <v-row>
            <v-col v-for="task in tasks" :key="task.name" cols="12" md="4">
              <div class="dark-card task-card">
                <div class="task-header">
                  <span class="task-name mono">{{ task.name }}</span>
                  <div class="task-badges">
                    <span class="badge">Core {{ task.core }}</span>
                    <span class="badge">P{{ task.priority }}</span>
                  </div>
                </div>
                <p class="hw-desc">{{ task.desc }}</p>
              </div>
            </v-col>
          </v-row>
        </section>

        <!-- Arquitectura -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Infraestructura</p>
          <h2 class="section-h2">Flujo de datos</h2>
          <p class="body-text">
            Todo corre en producción sobre una VM en Google Cloud, con Nginx como proxy inverso,
            SSL con Certbot y dominio DuckDNS. La base de datos está en Supabase (PostgreSQL administrado).
          </p>
          <div class="dark-card arch-box">

            <!-- ESP32 -->
            <div class="arch-center">
              <div class="arch-node node-iot">
                <span class="arch-icon">🤖</span>
                <span class="arch-label">ESP32 / Pepe</span>
                <span class="arch-sub">HC-SR04 · MQ-135</span>
              </div>
            </div>

            <!-- Flecha: MQTT -->
            <div class="arch-arrow-v">
              <div class="arrow-v-stem" />
              <span class="arrow-v-label">MQTT (JSON)</span>
              <div class="arrow-v-stem arrow-v-tip" />
            </div>

            <!-- Mosquitto -->
            <div class="arch-center">
              <div class="arch-node node-infra">
                <span class="arch-icon">📡</span>
                <span class="arch-label">Mosquitto</span>
                <span class="arch-sub">Broker MQTT · GCP VM</span>
              </div>
            </div>

            <!-- Flecha: Subscribe -->
            <div class="arch-arrow-v">
              <div class="arrow-v-stem" />
              <span class="arrow-v-label">Subscribe</span>
              <div class="arrow-v-stem arrow-v-tip" />
            </div>

            <!-- n8n -->
            <div class="arch-center">
              <div class="arch-node node-backend">
                <span class="arch-icon">⚙️</span>
                <span class="arch-label">n8n</span>
                <span class="arch-sub">Workflows · Lógica</span>
              </div>
            </div>

            <!-- Árbol: n8n → 3 salidas -->
            <div class="arch-tree">
              <div class="arch-outputs-row">
                <div class="arch-output-col">
                  <div class="arch-drop" />
                  <div class="arch-node node-db">
                    <span class="arch-icon">🗄️</span>
                    <span class="arch-label">PostgreSQL</span>
                    <span class="arch-sub">Supabase · aire · alarmas</span>
                  </div>
                </div>
                <div class="arch-output-col">
                  <div class="arch-drop" />
                  <div class="arch-node node-telegram">
                    <span class="arch-icon">✈️</span>
                    <span class="arch-label">Telegram</span>
                    <span class="arch-sub">PepeAire_bot · Alertas</span>
                  </div>
                </div>
                <div class="arch-output-col">
                  <div class="arch-drop" />
                  <div class="arch-node node-grafana">
                    <span class="arch-icon">📊</span>
                    <span class="arch-label">Grafana</span>
                    <span class="arch-sub">Dashboards públicos</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- n8n workflow grid -->
          <div class="d-flex flex-column ga-3">
            <h2 class="section-h2">n8n workflows</h2>
            <div class="n8n-grid">
              <div v-for="img in n8nImages" :key="img.src" class="n8n-card dark-card">
                <div class="n8n-titlebar">
                  <div class="n8n-dots">
                    <span class="dot dot-red" />
                    <span class="dot dot-yellow" />
                    <span class="dot dot-green" />
                  </div>
                  <span class="n8n-bar-label">{{ img.label }}</span>
                </div>
                <div class="n8n-img-wrap">
                  <img :src="img.src" :alt="img.label" class="n8n-grid-img zoomable" @click="openLightbox(img.src)" />
                </div>
                <div class="n8n-desc-bar">
                  <p class="n8n-desc">{{ img.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Dashboards -->
        <section class="d-flex flex-column ga-8">
          <p class="section-label">Dashboards en vivo</p>
          <h2 class="section-h2">Grafana</h2>
          <p class="body-text">
            Los dashboards consumen datos directamente desde PostgreSQL en Supabase.
            El reporte diario muestra detalle horario y el semanal la evolución día por día.
          </p>

          <div class="d-flex flex-column ga-4">
            <h3 class="dash-title">Reporte diario</h3>
            <GrafanaEmbed
              :url="dailyUrl"
              title="Reporte diario de calidad de aire"
              height="910px"
            />
          </div>

          <div class="d-flex flex-column ga-4">
            <h3 class="dash-title">Reporte semanal</h3>
            <GrafanaEmbed
              :url="weeklyUrl"
              title="Reporte semanal de calidad de aire"
              height="910px"
            />
          </div>
        </section>

        <!-- Bot de Telegram -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Bot de Telegram</p>
          <h2 class="section-h2">PepeAire_bot</h2>
          <p class="body-text">
            El bot centraliza toda la comunicación. Responde comandos on-demand y
            envía reportes automáticos generados por n8n consultando PostgreSQL.
          </p>
          <v-row>
            <v-col v-for="cmd in botFeatures" :key="cmd.label" cols="12" sm="6" md="4">
              <div class="dark-card cmd-card">
                <span class="cmd-type">{{ cmd.type }}</span>
                <p class="hw-name mono">{{ cmd.label }}</p>
                <p class="hw-desc">{{ cmd.desc }}</p>
              </div>
            </v-col>
          </v-row>

          <!-- Screenshots del bot -->
          <div class="tg-screenshots">

            <div class="tg-frame">
              <div class="tg-header">
                <div class="tg-avatar">✈️</div>
                <div class="tg-header-info">
                  <span class="tg-bot-name">PepeAire_bot</span>
                  <span class="tg-subtitle">Respuesta on-demand</span>
                </div>
                <span class="tg-online" />
              </div>
              <div class="tg-body">
                <img
                  v-show="!telegramComandoError"
                  :src="IMG.telegramComando"
                  alt="Respuesta del bot"
                  class="tg-screenshot zoomable"
                  @error="telegramComandoError = true"
                  @click="openLightbox(IMG.telegramComando)"
                />
                <div v-show="telegramComandoError" class="chat-placeholder">
                  <div class="chat-bubble chat-out">/ultimamedicion</div>
                  <div class="chat-bubble chat-in">
                    <p class="chat-p">📊 Última medición</p>
                    <p class="chat-p">Calidad: <strong>Buena</strong></p>
                    <p class="chat-p">Valor: 487 ppm</p>
                    <p class="chat-time">hace 2 minutos</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="tg-frame">
              <div class="tg-header">
                <div class="tg-avatar">✈️</div>
                <div class="tg-header-info">
                  <span class="tg-bot-name">PepeAire_bot</span>
                  <span class="tg-subtitle">Reporte automático</span>
                </div>
                <span class="tg-online" />
              </div>
              <div class="tg-body">
                <img
                  v-show="!telegramReporteError"
                  :src="IMG.telegramReporte"
                  alt="Reporte automático"
                  class="tg-screenshot zoomable"
                  @error="telegramReporteError = true"
                  @click="openLightbox(IMG.telegramReporte)"
                />
                <div v-show="telegramReporteError" class="chat-placeholder">
                  <div class="chat-bubble chat-in">
                    <p class="chat-p" style="color: var(--accent); font-weight: 600;">📋 Reporte diario</p>
                    <p class="chat-p">Promedio: 492 ppm</p>
                    <p class="chat-p">Alarmas: 0</p>
                    <p class="chat-p">Mejor hora: 06:00</p>
                    <p class="chat-time">08:00 · generado por n8n</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="tg-frame">
              <div class="tg-header">
                <div class="tg-avatar">✈️</div>
                <div class="tg-header-info">
                  <span class="tg-bot-name">PepeAire_bot</span>
                  <span class="tg-subtitle">Alerta de calidad</span>
                </div>
                <span class="tg-online" />
              </div>
              <div class="tg-body">
                <img
                  v-show="!telegramAlarmaError"
                  :src="IMG.telegramAlarma"
                  alt="Alerta del bot"
                  class="tg-screenshot zoomable"
                  @error="telegramAlarmaError = true"
                  @click="openLightbox(IMG.telegramAlarma)"
                />
                <div v-show="telegramAlarmaError" class="chat-placeholder">
                  <div class="chat-bubble chat-in">
                    <p class="chat-p" style="color: #ef4444; font-weight: 600;">⚠️ Alarma de calidad</p>
                    <p class="chat-p">Calidad: <strong>Deficiente</strong></p>
                    <p class="chat-p">Valor: 612 ppm</p>
                    <p class="chat-p">Umbral superado</p>
                    <p class="chat-time">Alerta automática · n8n</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- Navegación autónoma -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Machine Learning</p>
          <h2 class="section-h2">Navegación autónoma</h2>
          <div class="dark-card ml-card">

            <p class="body-text" style="margin-top: 1rem;">
              Un modelo <strong class="hl">MLP entrenado en Python</strong> recibe las lecturas de los
              tres sensores ultrasónicos HC-SR04 vía MQTT y publica decisiones de acción de motor en
              tiempo real, logrando <strong class="hl">navegación reactiva básica</strong>: Pepe esquiva
              obstáculos de forma autónoma sin programación explícita de reglas.
            </p>
            <div class="ml-flow">
              <div class="ml-step">
                <span class="ml-icon">📡</span>
                <span class="ml-text">HC-SR04 (×3)<br><span style="color:#64748b;font-size:0.75rem">Distancias en cm</span></span>
              </div>
              <span class="ml-arrow">→</span>
              <div class="ml-step">
                <span class="ml-icon">🧠</span>
                <span class="ml-text">MLP (Python)<br><span style="color:#64748b;font-size:0.75rem">Inferencia enviada por MQTT</span></span>
              </div>
              <span class="ml-arrow">→</span>
              <div class="ml-step">
                <span class="ml-icon">⚡</span>
                <span class="ml-text">L298N<br><span style="color:#64748b;font-size:0.75rem">Acción de motores</span></span>
              </div>
            </div>
          </div>
        </section>


      </v-container>
    </v-main>
    <TheFooter />

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxSrc" class="lightbox-overlay" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">✕</button>
        <img :src="lightboxSrc" class="lightbox-img" alt="Imagen ampliada" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheNavbar from '../../components/TheNavbar.vue'
import TheFooter from '../../components/TheFooter.vue'
import ProjectHeader from '../../components/ProjectHeader.vue'
import GrafanaEmbed from '../../components/GrafanaEmbed.vue'
import TechBadge from '../../components/TechBadge.vue'

const lightboxSrc = ref(null)
function openLightbox(src) { lightboxSrc.value = src }
function closeLightbox() { lightboxSrc.value = null }
function handleKeydown(e) { if (e.key === 'Escape') closeLightbox() }
onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))

const n8nSlide = ref(0)
const n8nImages = [
  {
    src:   '/projects/iot-robot/n8n-registro.png',
    label: 'Registro de mediciones',
    desc:  'Escucha el tópico MQTT robot/aire y persiste cada lectura en la tabla aire de PostgreSQL (Supabase).',
  },
  {
    src:   '/projects/iot-robot/n8n-telegram-conexion.png',
    label: 'Monitor de conexión',
    desc:  'Chequea cada minuto si el robot envió una medición. Si no hay actividad en 5 minutos, notifica "robot desconectado". En cuanto llega una nueva medición, notifica "robot reconectado".',
  },
  {
    src:   '/projects/iot-robot/n8n-telegram-comandos.png',
    label: 'Comandos on-demand',
    desc:  'Maneja /ultimamedicion, /promediohora y /promediodia: consulta PostgreSQL y responde al usuario en tiempo real.',
  },
  {
    src:   '/projects/iot-robot/n8n-telegram-reportes.png',
    label: 'Reportes automáticos',
    desc:  'Flujos programados: reporte diario todos los días a las 8am y reporte semanal los domingos a las 8am.',
  },
]
const telegramComandoError   = ref(false)
const telegramReporteError   = ref(false)
const telegramAlarmaError    = ref(false)

const currentSlide = ref(0)
const robotImages = [
  '/projects/iot-robot/robot.jpeg',
  '/projects/iot-robot/robot1.jpeg',
  '/projects/iot-robot/robot2.jpeg',
]
function prevSlide() { if (currentSlide.value > 0) currentSlide.value-- }
function nextSlide() { if (currentSlide.value < robotImages.length - 1) currentSlide.value++ }

const IMG = {
  telegramComando:  '/projects/iot-robot/telegram-comando.jpeg',
  telegramReporte:  '/projects/iot-robot/telegram-reporte.jpeg',
  telegramAlarma:   '/projects/iot-robot/telegram-alarma.jpeg',
}

const robotSpecs = [
  { label: 'Plataforma',          value: 'Chasis 2WD amarillo (Arduino-style)' },
  { label: 'Cerebro',             value: 'ESP32 DevKit V1 + FreeRTOS' },
  { label: 'Alimentación',        value: 'LiPo 3S · 11.1V · 1100mAh (Dean)' },
  { label: 'Sensores proximidad', value: '3× HC-SR04 ultrasónico' },
  { label: 'Sensor de aire',      value: 'MQ-135 (CO₂, NH₃, benceno)' },
  { label: 'Control motores',     value: 'L298N + step-down LM2596' },
]

const BASE = 'https://grafana-fabriziobiondi.duckdns.org'

function buildDailyUrl() {
  const now = new Date()
  const pad = n => String(n).padStart(2, '0')
  const varDia = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const startOfToday    = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return `${BASE}/d/fagfnz4/aire-detalle-dia?orgId=1&var-dia=${varDia}&from=${startOfToday.toISOString()}&to=${startOfTomorrow.toISOString()}&timezone=browser&kiosk`
}

function buildWeeklyUrl() {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return `${BASE}/d/fa98846/aire-semana?orgId=1&from=${sevenDaysAgo.toISOString()}&to=${now.toISOString()}&timezone=browser&kiosk`
}

const dailyUrl  = buildDailyUrl()
const weeklyUrl = buildWeeklyUrl()

const tags = [
  { label: 'ESP32',        category: 'iot' },
  { label: 'FreeRTOS',     category: 'iot' },
  { label: 'C++ / PlatformIO', category: 'iot' },
  { label: 'MQTT',         category: 'iot' },
  { label: 'Mosquitto',    category: 'iot' },
  { label: 'MQ-135',       category: 'iot' },
  { label: 'HC-SR04',      category: 'iot' },
  { label: 'Python / MLP', category: 'backend' },
  { label: 'n8n',          category: 'backend' },
  { label: 'Telegram Bot', category: 'backend' },
  { label: 'PostgreSQL',   category: 'database' },
  { label: 'Supabase',     category: 'database' },
  { label: 'Grafana',      category: 'iot' },
  { label: 'Docker',       category: 'devops' },
  { label: 'GCP',          category: 'devops' },
  { label: 'Nginx',        category: 'devops' },
]

const hardware = [
  {
    icon: '🧠',
    name: 'ESP32 DevKit V1',
    desc: 'Cerebro del sistema. Corre FreeRTOS con tres tareas concurrentes y conectividad WiFi para MQTT.',
  },
  {
    icon: '⚡',
    name: 'Driver L298N',
    desc: 'Control de dos motores DC. Alimentado por step-down LM2596 para evitar caídas de tensión con el WiFi activo.',
  },
  {
    icon: '🔋',
    name: 'LiPo 3S 11.1V / 1100mAh',
    desc: 'Batería principal con conector Dean. Step-down LM2596 entrega hasta 3A regulados.',
  },
  {
    icon: '📡',
    name: 'HC-SR04 × 3',
    desc: 'Sensores ultrasónicos distribuidos para detección de obstáculos en distintas direcciones.',
  },
  {
    icon: '💨',
    name: 'MQ-135',
    desc: 'Sensor de gases: detecta CO₂, NH₃, benceno y otros compuestos volátiles en ambientes cerrados.',
  },
  {
    icon: '🚗',
    name: 'Chasis 2WD',
    desc: 'Plataforma amarilla estilo Arduino con dos motores DC. Base mecánica del robot Pepe.',
  },
]

const tasks = [
  {
    name: 'tareaSensores',
    core: 0,
    priority: 3,
    desc: 'Lee los tres sensores ultrasónicos HC-SR04 y publica las distancias en una QueueHandle_t compartida.',
  },
  {
    name: 'tareaAire',
    core: 0,
    priority: 2,
    desc: 'Lee el sensor MQ-135 periódicamente y encola el valor de calidad del aire para su publicación.',
  },
  {
    name: 'tareaMQTT',
    core: 1,
    priority: 1,
    desc: 'Consume las colas de ambas tareas y publica en robot/sensores y robot/aire en formato JSON anidado.',
  },
]

const botFeatures = [
  { type: 'Comando', label: '/ultimamedicion', desc: 'Devuelve la última lectura de calidad de aire registrada en PostgreSQL.' },
  { type: 'Comando', label: '/promediohora',   desc: 'Calcula y responde el promedio de la última hora de mediciones.' },
  { type: 'Comando', label: '/promediodia',    desc: 'Calcula y responde el promedio del día actual.' },
  { type: 'Automático', label: 'Alerta reactiva', desc: 'Si la lectura supera el umbral, n8n inserta en tabla alarmas y notifica al instante.' },
  { type: 'Automático', label: 'Reporte diario',  desc: 'Todos los días a las 8am, n8n genera y envía un resumen del día anterior.' },
  { type: 'Automático', label: 'Reporte semanal', desc: 'Los domingos a las 8am, resumen semanal con evolución de la calidad del aire.' },
]
</script>

<style scoped>
.section-h2   { font-size: 1.5rem; font-weight: 600; color: #f1f5f9; }
.body-text    { color: #94a3b8; line-height: 1.8; margin: 0; }
.hl           { color: #e2e8f0; font-weight: 500; }
.mono         { font-family: ui-monospace, monospace; font-size: 0.9em; }
.two-col-text { display: flex; flex-direction: column; gap: 1rem; }
.dash-title   { font-size: 1rem; font-weight: 500; color: #cbd5e1; margin: 0; }

/* Hardware cards */
.hw-card  { padding: 1.25rem; display: flex; align-items: flex-start; gap: 1rem; height: 100%; }
.hw-icon  { font-size: 1.5rem; flex-shrink: 0; padding-top: 0.125rem; }
.hw-name  { color: #e2e8f0; font-weight: 500; font-size: 0.9rem; margin: 0 0 0.25rem; }
.hw-desc  { color: #64748b; font-size: 0.8rem; line-height: 1.5; margin: 0; }

/* Task cards */
.task-card   { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; height: 100%; }
.task-header { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
.task-name   { color: var(--accent); font-size: 0.85rem; }
.task-badges { display: flex; gap: 0.375rem; }
.badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(0,180,216,0.1);
  border: 1px solid rgba(0,180,216,0.25);
  color: #94a3b8;
  font-family: ui-monospace, monospace;
}

/* Arquitectura */
.arch-box { padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 0; }
.arch-center { display: flex; justify-content: center; }
.arch-node {
  display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
  padding: 1rem 1.5rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.1);
  background: var(--navy-dark);
  min-width: 10rem;
  text-align: center;
}
.arch-icon  { font-size: 1.75rem; }
.arch-label { color: #e2e8f0; font-size: 0.85rem; font-weight: 600; }
.arch-sub   { color: #475569; font-size: 0.7rem; }

/* Flechas verticales */
.arch-arrow-v {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.25rem 0;
}
.arrow-v-stem {
  width: 2px;
  height: 1.25rem;
  background: rgba(0,180,216,0.35);
}
.arrow-v-tip {
  position: relative;
}
.arrow-v-tip::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0,180,216,0.5);
}
.arrow-v-label {
  color: #334155;
  font-size: 0.65rem;
  font-family: ui-monospace, monospace;
  white-space: nowrap;
}

/* Árbol de salidas */
.arch-tree {
  width: 100%;
  position: relative;
  padding-top: 1.5rem;
}
.arch-tree::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 1.5rem;
  background: rgba(0,180,216,0.35);
  transform: translateX(-50%);
}
.arch-outputs-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  position: relative;
}
.arch-outputs-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: calc(100% / 6);
  right: calc(100% / 6);
  height: 2px;
  background: rgba(0,180,216,0.35);
}
.arch-output-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.arch-drop {
  width: 2px;
  height: 1.5rem;
  background: rgba(0,180,216,0.35);
}

.node-iot      { border-color: rgba(19,78,74,0.5);  background: rgba(19,78,74,0.15); }
.node-infra    { border-color: rgba(0,180,216,0.3); background: rgba(0,180,216,0.08); }
.node-backend  { border-color: rgba(88,28,135,0.4); background: rgba(88,28,135,0.1); }
.node-db       { border-color: rgba(12,74,110,0.4); background: rgba(12,74,110,0.1); }
.node-telegram { border-color: rgba(0,180,216,0.3); background: rgba(0,180,216,0.08); }
.node-grafana  { border-color: rgba(124,45,18,0.4); background: rgba(124,45,18,0.1); }

/* Bot commands */
.cmd-card { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; height: 100%; }
.cmd-type {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  font-family: ui-monospace, monospace;
}

/* ML card */
.ml-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ML flow */
.phase-header { display: flex; }
.phase-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(0,180,216,0.1);
  border: 1px solid rgba(0,180,216,0.3);
  color: var(--accent);
  font-weight: 500;
}
.ml-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.ml-step {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: var(--navy-dark);
  border: 1px solid rgba(255,255,255,0.07);
}
.ml-icon { font-size: 1.25rem; }
.ml-text { color: #cbd5e1; font-size: 0.85rem; line-height: 1.4; }
.ml-arrow { color: rgba(0,180,216,0.5); font-size: 1.25rem; font-weight: 300; }

/* Robot showcase */
.robot-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}
.robot-photo-slot { width: 100%; }

/* Slider */
.robot-slider {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  aspect-ratio: 4 / 3;
  background: var(--navy-dark);
}
.slider-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.35s ease;
}
.slide-img {
  min-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
}
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.15);
  color: #e2e8f0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 2;
  padding: 0;
}
.slider-btn:hover:not(:disabled) { background: rgba(0,180,216,0.4); }
.slider-btn:disabled { opacity: 0.25; cursor: default; }
.slider-prev { left: 0.5rem; }
.slider-next { right: 0.5rem; }
.slider-dots {
  position: absolute;
  bottom: 0.625rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.375rem;
  z-index: 2;
}
.slider-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: background 0.2s;
}
.slider-dot.active { background: var(--accent); }
.robot-specs { display: flex; flex-direction: column; gap: 0.875rem; }
.robot-spec-item { display: flex; align-items: flex-start; gap: 0.75rem; }
.spec-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 0.4rem;
}
.spec-label { color: #94a3b8; font-size: 0.85rem; }
.spec-value { color: #e2e8f0; font-size: 0.85rem; }

/* n8n frame */
.n8n-frame { overflow: hidden; padding: 0; }
.n8n-titlebar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem 1rem;
  background: var(--navy-dark);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.n8n-dots { display: flex; gap: 0.375rem; }
.dot { width: 0.65rem; height: 0.65rem; border-radius: 50%; }
.dot-red    { background: #ef4444; }
.dot-yellow { background: #eab308; }
.dot-green  { background: #22c55e; }
.n8n-bar-label {
  color: #e2e8f0;
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.n8n-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.n8n-card { overflow: hidden; padding: 0; }
.n8n-img-wrap {
  background: #0d0d0d;
  overflow: hidden;
}
.n8n-grid-img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease;
}
.n8n-card:hover .n8n-grid-img { transform: scale(1.03); }
.n8n-desc-bar {
  padding: 0.75rem 1rem;
  background: var(--navy-dark);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.n8n-desc {
  color: #64748b;
  font-size: 0.78rem;
  line-height: 1.5;
  margin: 0;
}
@media (max-width: 600px) {
  .n8n-grid { grid-template-columns: 1fr; }
}

/* Telegram frames */
.tg-screenshots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.tg-frame {
  background: var(--navy-light);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  overflow: hidden;
}
.tg-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--navy-dark);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.tg-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: rgba(0,136,204,0.15);
  border: 1px solid rgba(0,136,204,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.tg-header-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 0;
}
.tg-bot-name {
  color: #e2e8f0;
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tg-subtitle {
  color: #475569;
  font-size: 0.68rem;
  font-family: ui-monospace, monospace;
}
.tg-online {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
}
.tg-body { background: var(--navy); }
.tg-screenshot { width: 100%; display: block; }

/* Chat placeholder inside phone */
.chat-placeholder {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0.75rem;
}
.chat-bubble {
  padding: 0.625rem 0.875rem;
  border-radius: 12px;
  font-size: 0.78rem;
  line-height: 1.5;
  max-width: 85%;
}
.chat-out {
  background: rgba(0,180,216,0.15);
  border: 1px solid rgba(0,180,216,0.25);
  color: var(--accent);
  align-self: flex-end;
  font-family: ui-monospace, monospace;
}
.chat-in {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  color: #cbd5e1;
  align-self: flex-start;
}
.chat-p    { margin: 0 0 0.2rem; font-size: 0.78rem; }
.chat-time { margin: 0.25rem 0 0; font-size: 0.65rem; color: #475569; }

@media (max-width: 700px) {
  .robot-showcase { grid-template-columns: 1fr; }
}
@media (max-width: 860px) and (min-width: 601px) {
  .tg-screenshots { grid-template-columns: repeat(2, 1fr); }
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: zoom-out;
  padding: 2rem;
  backdrop-filter: blur(4px);
}
.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
  cursor: default;
}
.lightbox-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #e2e8f0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.lightbox-close:hover { background: rgba(255, 255, 255, 0.22); }
.zoomable { cursor: zoom-in; }

@media (max-width: 600px) {
  .arch-outputs-row { grid-template-columns: 1fr; }
  .arch-outputs-row::before { display: none; }
  .arch-tree::before { display: none; }
  .ml-flow { flex-direction: column; align-items: flex-start; }
  .ml-arrow::before { content: '↓'; }
  .ml-arrow { font-size: 0; }
  .ml-arrow::before { font-size: 1.25rem; color: rgba(0,180,216,0.5); }
  .tg-screenshots { grid-template-columns: 1fr; }
}
</style>
