import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from "vuex-class-component";

@Module({ namespacedPath: "", target: "nuxt" })
export class IndexStore extends VuexModule {}
export default IndexStore.ExtractVuexModule(IndexStore);
