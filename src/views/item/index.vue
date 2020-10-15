<template>
  <v-container class="p-item">
    <div class="p-item__col-left">
      <v-btn
        elevation="2"
        x-large
        link
        block
        color="white"
        :to="{
          name: 'List'
        }"
      >
        <v-icon color="primary">
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </div>
    <div class="p-item__col-right">
      <div class="p-item__main" v-if="item">
        <div class="p-item__title">
          {{ item.customerInfo.name }}
        </div>
        <div class="p-item__contacts">
          <div class="p-item__contacts-links">
            <span>
              {{ item.customerInfo.email }}
            </span>
            <a :href="'tel:' + item.customerInfo.phone"
               class="p-item__contacts-link p-item__contacts-link--phone"
            >
              {{ item.customerInfo.phone }}
            </a>
          </div>
          <div class="p-item__contacts-addresses">
            <div class="p-item__contacts-address" v-if="item.serviceAddress">
              <span class="p-item__contacts-address-name">Service address: </span>
              <span class="p-item__contacts-address-value">{{ item.serviceAddress }}</span>
            </div>
            <div class="p-item__contacts-address" v-if="item.billingAddress">
              <span class="p-item__contacts-address-name">Billing address: </span>
              <span class="p-item__contacts-address-value">{{ item.billingAddress }}</span>
            </div>
          </div>
        </div>
        <v-card elevation="0" class="p-item__form-wrapper">
          <v-form class="p-item__form">
            <v-container fluid>
              <div class="p-item__form-title">
                {{ item.job }} - {{ item.price.symbol }}{{ item.price.amount }}
              </div>
              <v-row class="p-item__form-controls">
                <v-col class="p-item__form-control p-item__form-control--statuses">
                  <v-select
                    :items="LEAD_STATUSES"
                    :value="item.leadStatus"
                    placeholder="Show all Job"
                    outlined
                    hide-details
                    @change="onChangeStatus"
                  />
                </v-col>
                <v-col class="p-item__form-control">
                  <v-text-field
                    placeholder="Add status comment"
                    outlined
                    hide-details
                    :value="item.statusComment"
                    @change="onChangeComment"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Lead, StatusesLead } from '@/types/lead';
import LeadsApi from '@/api/leads';
import { LEAD_STATUSES } from '@/constatns/leads';
import { debounce } from '@/utils/perfomance';
import { DELAY_BEFORE_REQUEST } from '@/constatns/perfomance';
// TODO: разобраться с цветом кнопки назад

@Component({})
export default class ItemPage extends Vue {
  @Prop([String, Number])
  readonly id!: string;

  readonly LEAD_STATUSES = LEAD_STATUSES;

  item: Lead | null = null;

  loading = false;

  async fetchData() {
    this.loading = true;
    try {
      const { item } = await LeadsApi.getItemById(+this.id);
      this.item = item;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async sendUpdatedDataByField(fieldName: keyof Lead, value: any) {
    const newData = {
      ...this.item,
      [fieldName]: value,
    } as Lead;
    try {
      const { item } = await LeadsApi.updateItem(newData);
      this.item = item;
    } catch (e) {
      console.log(e);
    }
  }

  onChangeStatus(status: StatusesLead) {
    this.sendUpdatedDataByField('leadStatus', status);
  }

  _onChangeComment(comment: string) {
    this.sendUpdatedDataByField('statusComment', comment);
  }

  /**
   * onChangeComment with debounce
   * Возможно не лучшее решение, следует использовать, если необходимо снизить нагрузку на сервер
   * Но если с сервером все ок, то лучше не использовать debounce
   * (уменьшится проблема синхронизации вводимых данных и обновленных)
   */
  onChangeComment = debounce(this._onChangeComment, DELAY_BEFORE_REQUEST);

  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss">
.p-item {
  display: flex;
  padding-top: 34px;
}
.p-item__col-left {
  margin-right: 25px;
  flex-basis: 75px;
  flex-grow: 0;
  flex-shrink: 0;
}
.p-item__col-right {
  flex-grow: 1;
  flex-shrink: 0;
}
.p-item__title {
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 13px;
  margin-top: 10px;
}
.p-item__contacts {
  display: flex;
  font-size: 14px;
}
.p-item__contacts-links {
  display: flex;
  flex-direction: column;
  width: 296px;
}
.p-item__contacts-link {
  text-decoration: none;
}
.p-item__contacts-address-name {
  color: rgba(0, 0, 0, 0.38);
  min-width: 105px;
}
.p-item__form-wrapper {
  margin-top: 25px;
  max-width: 963px;
}
.p-item__form {
  padding: 12px 12px 0;
}
.p-item__form-title {
  margin-bottom: 9px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
}
.p-item__form-controls {}
.p-item__form-control {}

$_control-statuses-width: 271px;
.p-item__form-control--statuses {
  flex-basis: $_control-statuses-width;
  max-width: $_control-statuses-width;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
