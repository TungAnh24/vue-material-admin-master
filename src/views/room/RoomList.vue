<template>
  <v-container>
    <div class="dashboard">
      <v-subheader>
        <v-icon class="mr-2" color="green">mdi-home</v-icon>
        <h3>Danh sách danh mục</h3>
        <v-spacer></v-spacer>
        <v-btn color="green" small dark elevation="3" fab @click="dialogAdd = true">
          <v-icon color="white">mdi-account-plus</v-icon>
        </v-btn>
      </v-subheader>
      <v-row class="mt-0">
        <v-col>
          <v-card>
            <v-data-table
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :headers="headers"
              :items="categories"
              :items-per-page="5"
            >
              <template v-slot:top>
                <v-text-field v-model="search" label="Search " class="mx-4"></v-text-field>
              </template>
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.categoryName }}</td>
                  <td>{{ item.description }}</td>
                  <td>
                    <div class="d-flex justify-end align-center">
                      <v-btn
                        fab
                        dark
                        elevation="3"
                        class="mr-3"
                        x-small
                        color="green"
                        @click="
                          dialogEdit = true
                          currentItem = item
                        "
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        x-small
                        c
                        color="red"
                        @click="
                          dialogDelete = true
                          categoryId = item.id
                        "
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialogDelete" max-width="450px" class="dialog-delete">
        <v-card>
          <v-alert prominent type="error">
            <v-row align="center">
              <v-col class="text-center text-h5" cols="11"> Bạn có đồng ý xóa không? </v-col>
            </v-row>
            <v-row align="center">
              <v-spacer></v-spacer>
              <v-col cols="5">
                <v-btn @click="deleteCategory" text> Đồng ý </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn @click="dialogDelete = false" text> Hủy bỏ </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-card>
      </v-dialog>
      <add :dialogAdd="dialogAdd" @close="dialogAdd = false" @updateData="getListCategory" />
      <edit
        :dialogEdit="dialogEdit"
        @close="dialogEdit = false"
        :currentItem="currentItem"
        @updateData="getListCategory"
      />
    </div>
  </v-container>
</template>

<script>
import TooltipMixin from '@/mixins/Tooltip'
import TaskForm from '@/components/form/TaskForm'
import { mapGetters } from 'vuex'
export default {
  components: {
    TaskForm,
  },
  mixins: [TooltipMixin],
  data() {
    return {
      showDialog: false,
      search: '',
      loadingItems: false,
      selectedItem: null,
      serverItemsLength: 0,
      itemsPerPage: 15,
      showFilter: true,
      filter: {
        page: 1,
        'filter[name]': null,
        'filter[project_id]': null,
        'filter[status]': null,
      },
      headers: [
        {
          text: 'STT',
          value: 'project.name',
        },
        {
          text: 'Task',
          value: 'name',
        },
        {
          text: 'Description',
          value: 'description',
        },
        {
          text: 'slug',
          value: 'slug',
        },
        {
          text: 'Status',
          value: 'status',
          width: 100,
        },
        {
          text: 'Action',
          value: 'action',
        },
      ],
      items: [],
      actions: [
        {
          text: 'Edit Item',
          icon: 'mdi-pencil',
          click: this.handleEditItem,
        },
        {
          text: 'Delete Item',
          icon: 'mdi-close',
          click: this.handleDeleteItem,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getTaskStatus', 'getProjectList']),
  },
  watch: {
    '$route.query': {
      handler(query) {
        const filter = this.updateFilterQuery(query)
        this.fetchRecords(filter)
      },
      immediate: true,
    },
  },

  methods: {
    //
    updateFilterQuery(query) {
      const filter = Object.assign(this.filter, this.transformQuery(query))
      return filter
    },
    transformQuery(query) {
      const numbers = ['filter[project_id]', 'filter[status]', 'page']
      for (let key in query) {
        if (numbers.includes(key)) {
          const val = query[key] ? parseInt(query[key]) : query[key]
          query[key] = val
        }
      }
      return query
    },
    resetFilter() {
      this.filter = {
        page: 1,
        'filter[name]': null,
        'filter[project_id]': null,
        'filter[status]': null,
      }
    },
    fetchRecords(query) {
      this.loadingItems = true
      this.items = []
      return this.$store
        .dispatch('fetchTask', query)
        .then(({ data, meta }) => {
          this.items = data
          this.serverItemsLength = meta.total
          this.loadingItems = false
        })
        .catch(() => {
          this.loadingItems = false
        })
    },
    //action
    handleCreateItem() {
      this.selectedItem = null
      this.showDialog = true
    },
    handleEditItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
    handleDeleteItem({ id }) {
      if (window.confirm('Are you sure to delete this')) {
        this.$store.dispatch('deleteTask', id).then(() => {
          this.items = this.items.filter((item) => item.id != id)
        })
      }
    },
    handleUpdateStatus(item, status) {
      const payload = {
        id: item.id,
        data: {
          status: status,
        },
      }
      this.$store.dispatch('updateTask', payload)
    },
    handleRefreshItem() {
      this.fetchRecords(this.filter)
    },
    // filter
    handlePageChanged(page) {
      this.filter.page = page
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      })
    },
    handleResetFilter() {
      this.filter = {
        page: 1,
        'filter[name]': null,
        'filter[status]': null,
      }
      this.$router.replace({
        path: this.$route.path,
      })
    },
    handleApplyFilter() {
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      })
    },
    handleClear() {
      this.resetFilter()
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      })
    },
    handleFormSuccess() {
      this.showDialog = false
      this.fetchRecords()
    },
  },
}
</script>
