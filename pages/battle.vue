<template>
  <section>
    <h1 class="header">ばとる</h1>
    <div>
      <p>あなたのHP {{hp}}</p>
      <p></p>
      <p>敵のHP {{enemy_hp}}</p>
      <p></p>
      <div v-if="battle_state == 0">
        <button @pointerdown="attack">攻撃</button>
      </div>
      <div v-else>
        <router-link to="/">戻る</router-link>
      </div>
      <div>
        <p v-for="(message, i) in messages" :key="i">{{message}}</p>
      </div>
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
export default class Battle extends Vue {
  hp = 5;
  enemy_hp = 5;
  messages: string[] = [];

  //戦闘状態0:戦闘中 1:勝利 -1:敗北
  battle_state = 0;

  attack() {
    const max = 3,
      min = 1;
    const enemy_damage = Math.floor(Math.random() * (max + 1 - min)) + min;
    this.enemy_hp -= enemy_damage;
    this.messages.push(`${enemy_damage}のダメージを与えた`);
    if (this.enemy_hp <= 0) {
      this.messages.push("敵を倒した");
      this.battle_state = 1;
    } else {
      const damage = Math.floor(Math.random() * (max - min)) + min;
      this.hp -= damage;
      this.messages.push(`${damage}のダメージを受けた`);
      if (this.hp <= 0) {
        this.messages.push("負けた");
        this.battle_state = -1;
      }
    }
  }
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
