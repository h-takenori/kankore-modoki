import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from "vuex-class-component";

@Module({ namespacedPath: "", target: "nuxt" })
export class IndexStore extends VuexModule {
  // レベル
  level = 1;

  // 経験値
  exp = 0;

  //次のレベルの経験値
  next_exp = 10;

  //最大HP
  max_hp = 10;

  // 攻撃力
  pow = 3;

  @mutation set_state(payload: {
    level?: number;
    exp?: number;
    next_exp?: number;
    max_hp?: number;
    pow?: number;
  }) {
    if (payload.level != undefined) this.level = payload.level;
    if (payload.exp != undefined) this.exp = payload.exp;
    if (payload.next_exp != undefined) this.next_exp = payload.next_exp;
    if (payload.max_hp != undefined) this.max_hp = payload.max_hp;
    if (payload.pow != undefined) this.pow = payload.pow;
  }
}
export default IndexStore.ExtractVuexModule(IndexStore);
