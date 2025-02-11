<template>
 <PageHeader/>
 <div>
   <h1>
     Está é uma página de testes apenas
    </h1>
  </div>
  <div class="vote-card">
    <VoteCard :shouldShow="true" value="10"/>

  </div>
</template>

<script setup lang="ts">
</script>

<style>
.vote-card {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>