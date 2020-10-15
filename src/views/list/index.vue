<template>
  <v-container class="p-list">
    <v-row class="p-list__header">
      <v-col class="p-list__count">
        Total {{ totalItems }} {{ totalItems > 1 ? 'leads' : 'lead' }}
      </v-col>
      <v-spacer />
      <v-col class="p-list__search-wrapper">
        <v-text-field
          placeholder="Search by name, phone or email"
          outlined
          hide-details
          :value="searchQuery"
          background-color="#ffffff"
          @input="onChangeSearchQuery"
        />
      </v-col>
      <v-col class="p-list__select-statuses-wrapper">
        <v-select
          :items="LEAD_STATUSES"
          :value="selectedStatus"
          placeholder="Show all leads"
          outlined
          hide-details
          clearable
          background-color="#ffffff"
          @change="onChangeCurrentStatus"
        ></v-select>
      </v-col>
    </v-row>
    <div class="p-list__main">
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        :sortable="false"
        :loading="loading"
        class="p-list__main"
        @click:row="onClickItem"
      >
        <template v-slot:item.customerInfo.name="{ item }">
          <span class="p-items__cell-name">
            {{ item.customerInfo.name }}
          </span>
        </template>
        <template v-slot:item.price.amount="{ item }">
          <span>
            {{ item.price.symbol }}{{ item.price.amount }}
          </span>
        </template>
        <template v-slot:item.updatedDate="{ item }">
          <span>
            {{ item.updatedDate | formatDate }}
          </span>
        </template>
      </v-data-table>
    </div>
    <div class="p-list__footer">
      <v-row>
        <v-pagination
          color="primary"
          :value="currentPage"
          :total-visible="3"
          :length="totalPage"
          class="p-list__pagination"
          @input="onChangePage"
        ></v-pagination>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Lead, StatusesLead } from '@/types/lead';
import LeadsApi from '@/api/leads';
import { LEAD_STATUSES } from '@/constatns/leads';
import { dateTimeFormatUS } from '@/utils/format';
import { debounce } from '@/utils/perfomance';
import { DELAY_BEFORE_REQUEST } from '@/constatns/perfomance';

@Component({
  filters: {
    formatDate(val) {
      return dateTimeFormatUS.format(val);
    },
  },
})
export default class ListPage extends Vue {
  readonly LEAD_STATUSES: StatusesLead[] = LEAD_STATUSES;

  items: Lead[] = [];

  totalItems = 0;

  currentPage = 1;

  totalPage = 0;

  searchQuery = '';

  selectedStatus: StatusesLead | null = null;

  loading = false;

  headers = [
    {
      text: 'Status',
      align: 'start',
      sortable: false,
      value: 'leadStatus',
      class: 'p-items__th',
    },
    {
      text: 'Name',
      value: 'customerInfo.name',
      class: 'p-items__th',
    },
    { text: 'Job', value: 'job', class: 'p-items__th' },
    { text: 'Phone', value: 'customerInfo.phone', class: 'p-items__th' },
    { text: 'Value', value: 'price.amount', class: 'p-items__th' },
    { text: 'Updated', value: 'updatedDate', class: 'p-items__th' },
  ]

  async fetchData() {
    this.loading = true;
    try {
      const response = await LeadsApi.getItems({
        page: this.currentPage - 1,
        search: this.searchQuery,
        status: this.selectedStatus,
      });
      this.items = response.items;
      this.totalItems = response.totalElements;
      this.totalPage = response.totalPages;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  _fetchDataAfterChangeFilter() {
    this.fetchData();
  }

  /**
   * fetchData with debounce
   */
  fetchDataAfterChangeFilter = debounce(this._fetchDataAfterChangeFilter, DELAY_BEFORE_REQUEST);

  onChangePage(page: number) {
    this.currentPage = page;
    this.fetchDataAfterChangeFilter();
  }

  onChangeSearchQuery(query: string) {
    this.searchQuery = query;
    this.fetchDataAfterChangeFilter();
  }

  onChangeCurrentStatus(status: StatusesLead | undefined) {
    this.selectedStatus = status || null;
    this.fetchDataAfterChangeFilter();
  }

  onClickItem(item: Lead) {
    this.$router.push({ name: 'Item', params: { id: item.id.toString() } });
  }

  mounted() {
    this.fetchData();
  }
}
</script>

<style>
.p-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 15px;
}
.p-list__count {
  font-size: 24px;
  line-height: 28px;
  padding-top: 21px;
}
.p-list__header {
  align-items: baseline;
  flex-shrink: 0;
  flex-grow: 0;
}
.p-list__footer {
  margin-top: auto;
  margin-bottom: 17px;
}
.p-list__pagination .v-pagination{
  justify-content: flex-start;
}
.p-list__main {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.p-items__th {
  background: rgba(0, 0, 0, 0.04);
}
.p-items__cell-name {
  color: #1867C0;
}
</style>
