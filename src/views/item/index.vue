<template>
  <div class="p-item">
    Item page <br />
    id: {{ id }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ItemPage extends Vue {
  @Prop([String, Number])
  readonly id!: string | number;
}
</script>
