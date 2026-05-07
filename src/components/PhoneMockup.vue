<template>
  <div class="phone-outer">
    <div class="phone-body">
      <div class="phone-screen">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-outer {
  position: relative;
  margin: 0 auto;
  width: 260px;
}
.phone-body {
  background: var(--navy-dark);
  border: 2px solid #475569;
  border-radius: 2.5rem;
  padding: 0.75rem;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
}
.phone-screen {
  background: var(--navy);
  border-radius: 2rem;
  overflow: hidden;
  min-height: 510px;
}
</style>
