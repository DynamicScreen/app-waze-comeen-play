import {
  ISlideOptionsContext,
  SlideOptionsModule, VueInstance
} from "@comeen/comeen-play-sdk-js";

export default class WazeTrafficOptionsModule extends SlideOptionsModule {
  constructor(context: ISlideOptionsContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
    const { h, computed, watchEffect } = vue;

    const update = context.update;

    const { Field, TextInput, SegmentedRadio, NumberInput } = this.context.components

    context.updateAutoName(this.t("app.name"))

    const valid = computed(() => update.option("type").modelValue == "auto" || update.option("address").modelValue.latitude)
    watchEffect(() => context.updateValidationStatus(valid.value))

    const updateAddress = update.option('address', {
      default: { address: '', latitude: null, longitude: null },
      get: (val) => ({
        address: val ? val.text : '',
        latitude: val ? val.latitude : null,
        longitude: val ? val.longitude : null
      }),
      set: (val) => ({
        text: val.address,
        latitude: val.latitude,
        longitude: val.longitude
      }),
    })

    return () =>
      h("div", {}, [
        h(SegmentedRadio, {
          activeValue: 'auto',
          default: 'auto',
          options: [
            {
              value: 'auto',
              icon: 'fa fa-fw fa-map-marked-alt',
              label: this.t('modules.traffic.options.geolocation.label'),
              text: this.t('modules.traffic.options.geolocation.text'),
            },
            {
              value: 'fixed',
              icon: 'fa fa-fw fa-map-pin',
              label: this.t('modules.traffic.options.fixed.label'),
              text: this.t('modules.traffic.options.fixed.text'),
            }
          ],
          ...update.option('type', { default: 'auto' })
        }),
        update.option('type').modelValue == 'fixed' ?
          h(Field, { label: this.t('modules.traffic.options.address'), class: 'mt-4' }, [
            h(TextInput, {
              address: true,
              modelValue: updateAddress.modelValue.address,
              'onUpdate:modelValue': updateAddress['onUpdate:modelValue']
            })
          ]) : null,
        h(Field, { class: "mt-4", label: this.t('modules.traffic.options.zoom.label') }, [
          h(SegmentedRadio, {
            activeValue: 3,
            options: [
              {
                value: 11,
                icon: 'far fa-magnifying-glass-minus',
                label: this.t('modules.traffic.options.zoom.small'),
              },
              {
                value: 12,
                icon: 'far fa-magnifying-glass',
                label: this.t('modules.traffic.options.zoom.medium'),
              },
              {
                value: 14,
                icon: 'far fa-magnifying-glass-plus',
                label: this.t('modules.traffic.options.zoom.high'),
              },
            ],
            ...update.option('zoom', { default: 3 })
          })
        ])
      ]
    )
  }
}
