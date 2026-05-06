<template>
  <div class="phone-outer">
    <div class="phone-body">
      <div class="phone-notch" />
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
  width: 200px;
}
.phone-body {
  background: var(--navy-dark);
  border: 2px solid #475569;
  border-radius: 2.5rem;
  padding: 0.75rem;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
}
.phone-notch {
  position: absolute;
  top: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 4rem;
  height: 1.25rem;
  background: var(--navy-dark);
  border-radius: 9999px;
  border: 1px solid #475569;
  z-index: 10;
}
.phone-screen {
  background: var(--navy);
  border-radius: 2rem;
  overflow: hidden;
  padding-top: 1.5rem;
  min-height: 350px;
}
</style>
