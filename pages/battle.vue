<template>
  <section>
    <h1 class="header">ばとる</h1>
    <div>
      <p>第{{battle_count}}階層</p>

      <p>あなたのHP {{hp}}/{{store.max_hp}} Lv:{{store.level}} 経験値{{store.exp}}/{{store.next_exp}}</p>
      <p></p>
      <p>敵のHP {{enemy_hp}}</p>
      <p></p>
      <div v-if="battle_state == 0">
        <button @pointerdown="attack">攻撃</button>
      </div>
      <div v-else-if="battle_state == 1">
        <button @pointerdown="next_stage">次のステージ</button>
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
import { IndexStore } from "../store";

export const LevelMasters: { [key: number]: { next_exp: number } } = {
  1: { next_exp: 5 },
  2: { next_exp: 10 },
  3: { next_exp: 20 },
  4: { next_exp: 40 },
  5: { next_exp: 80 },
  6: { next_exp: 160 },
  7: { next_exp: 320 },
  8: { next_exp: 640 },
  9: { next_exp: 1280 }
};

@Component({
  components: {}
})
export default class Battle extends Vue {
  store = IndexStore.CreateProxy(this.$store, IndexStore);

  battle_count = 1;

  hp = 5;

  enemy_hp = 5;

  messages: string[] = [];

  //戦闘状態0:戦闘中 1:勝利 -1:敗北
  battle_state = 0;

  created() {
    this.hp = this.store.max_hp;
  }

  attack() {
    const min = 1;
    const enemy_damage =
      Math.floor(Math.random() * (this.store.pow + 1 - min)) + min;
    this.enemy_hp -= enemy_damage;
    this.messages.push(`${enemy_damage}のダメージを与えた`);
    if (this.enemy_hp <= 0) {
      this.messages.push("敵を倒した");
      this.battle_state = 1;
      const exp = this.store.exp + 10;
      this.store.set_state({ exp: exp });

      if (this.store.next_exp <= exp) {
        //レベルアップ
        let level = this.store.level + 1;
        let pow = this.store.pow + Math.floor(Math.random() * 3) + 1;
        let max_hp = this.store.max_hp + Math.floor(Math.random() * 5) + 1;
        const next_exp = LevelMasters[level].next_exp;
        this.hp = max_hp;
        this.store.set_state({
          level: level,
          next_exp: next_exp,
          pow: pow,
          max_hp: max_hp
        });
        this.messages.push(`レベルがあがった!`);
      }
    } else {
      const damage =
        Math.floor(Math.random() * (this.battle_count * 2 - min)) + min;
      this.hp -= damage;
      this.messages.push(`${damage}のダメージを受けた`);
      if (this.hp <= 0) {
        this.messages.push("負けた");
        this.battle_state = -1;
      }
    }
  }
  next_stage() {
    this.battle_count++;
    this.enemy_hp = this.battle_count * 5;
    this.battle_state = 0;
    this.messages = [];
    this.messages.push("敵が現れた");
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
