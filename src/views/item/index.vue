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
                    clearable
                    background-color="#ffffff"
                    @change="onChangeStatus"
                  />
                </v-col>
                <v-col class="p-item__form-control">
                  <v-text-field
                    placeholder="Add status comment"
                    outlined
                    hide-details
                    :value="item.statusComment"
                    background-color="#ffffff"
                    @input="onChangeComment"
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
// TODO: разобраться с цветом кнопки назад

@Component({})
export default class ItemPage extends Vue {
  @Prop([String, Number])
  readonly id!: string | number;

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

  async sendUpdatedDataByField(fieldName: keyof Lead, value) {
    const newData = {
      ...this.item,
      [fieldName]: value,
    };
    try {
      await LeadsApi.updateItem(newData);
      this.item[fieldName] = value;
    } catch (e) {
      console.log(e);
    }
  }

  onChangeStatus(status: StatusesLead) {
    // TODO: добавить debounce
    this.sendUpdatedDataByField('leadStatus', status);
  }

  onChangeComment(comment: string) {
    // TODO: добавить debounce
    this.sendUpdatedDataByField('statusComment', comment);
  }

  mounted() {
    this.fetchData();
  }
}
</script>

<style>
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
}

.p-item__contacts {
  display: flex;
}

.p-item__contacts-links {
  display: flex;
  flex-direction: column;
  width: 296px;
}
.p-item__contacts-link {
  text-decoration: none;
}
.p-item__contacts-link--email {
  color: inherit;
}
.p-item__contacts-address-name {
  color: rgba(0, 0, 0, 0.38);
  min-width: 105px;
}

.p-item__form-wrapper {
  margin-top: 27px;
}
.p-item__form {
  padding: 12px;
}
.p-item__form-title {
  margin-bottom: 5px;
  font-weight: bold;
}
.p-item__form-controls {}
.p-item__form-control {}
.p-item__form-control--statuses {
  flex-basis: 250px;
  max-width: 250px;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
