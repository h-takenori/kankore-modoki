<template>
  <section>
    <h1 class="header">かんこれっぽい</h1>
    <div>
      <ul>
        <li>出撃</li>
        <li>編成</li>
        <li>改装</li>
        <li>公社</li>
        <li>工廠</li>
        <li>入渠</li>
        <li>補給</li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import { Person } from "~/types";

@Component({
  components: {}
})
export default class extends Vue {
  @State people!: Person;
}
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
