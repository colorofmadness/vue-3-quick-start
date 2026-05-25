<template>
  <main class="home">
    <h1 class="home__title">Vue 3 + FSD Template</h1>
    <p class="home__subtitle">Современная архитектура для масштабируемых приложений</p>
  </main>
</template>

<script setup lang="ts">
// Пример страницы. Здесь подключаются виджеты и фичи.
</script>

<style module>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: var(--spacing-4);
  padding: var(--spacing-8);

  &__title {
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--color-primary);
  }

  &__subtitle {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
  }
}
</style>
