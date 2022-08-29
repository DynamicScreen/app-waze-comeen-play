import {
  ISlideContext,
  IPublicSlide,
  SlideModule,
  VueInstance
} from "@comeen/comeen-play-sdk-js";

import { nextTick } from 'vue';

export default class WazeTrafficSlideModule extends SlideModule {
  constructor(context: ISlideContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideContext) {
    const { h, reactive, ref, computed } = vue;

    const slide = reactive(props.slide) as IPublicSlide;
    this.context = reactive(props.slide.context);

    const zoom = ref(slide.data.zoom);
    const location = ref(slide.data.location)

    const url_lang = computed(() => {
      const lang = context.translator.language

      if (lang == 'fr') {
        return '/fr'
      } else {
        return ''
      }
    })

    const url = computed(() => `https://embed.waze.com${url_lang.value}/iframe?zoom=${zoom.value}&lat=${location.value.lat}&lon=${location.value.lng}`)

    this.context.onPrepare(async () => {
    });

    this.context.onReplay(async () => {
    });

    this.context.onPlay(async () => {
    });

    this.context.onPause(async () => {
    });
    this.context.onResume(async () => {
    });

    this.context.onEnded(async () => {
    });

    return () =>
      h("div", {
        class: "flex w-full h-full"
      }, [
        h("iframe", {
          src: url.value,
          class: 'w-full h-full'
        })
      ])
  }
}
