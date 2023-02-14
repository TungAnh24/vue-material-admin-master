<template>
  <div class="dashboard">
    <v-subheader>
      <v-icon class="mr-2" color="green">mdi-home</v-icon>
      <h3>Danh sách hóa đơn</h3>
      <v-spacer></v-spacer>
      <v-btn color="green" small dark elevation="3" fab @click="dialogAdd = true">
        <v-icon color="white">mdi-folder-plus</v-icon>
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
                <td>{{ item.id }}</td>
                <td>{{ item.billNumber }}</td>
                <td><img :src="'http://localhost:5136/images/bill/' + item.acctualFileUrl" style="width: 100px" /></td>
                <td>{{ item.contractNumber }} </td>
                <td>{{ item.rentalPrice }} </td>
                <td v-if="item.status === 0">Chưa thanh toán</td>
                <td v-else>Đã thanh toán</td>
                <td v-if="item.description === null">Đã thanh toán đầy đủ</td>
                <td v-else>{{ item.description }}</td>
                <td>{{ item.createdByUser }}</td>
                <td v-if="item.updatedByUser === null">Chưa chỉnh sửa</td>
                <td v-else>{{ item.updatedByUser }}</td>
                <td>{{ item.creationTime }}</td>
                <td v-if="item.lastUpdateTime === null">Chưa chỉnh sửa</td>
                <td v-else>{{ item.lastUpdateTime }}</td>
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
</template>

<script>
import axios from 'axios'
import Add from './Add.vue'
import Edit from './Edit.vue'
export default {
  components: { Add, Edit },
  name: 'Category',
  data() {
    return {
      search: '',
      headers: [
        { text: 'STT', value: 'id' },
        { text: 'Mã hóa đơn', value: 'billNumber' },
        { text: 'Ảnh hóa đơn', value: 'acctualFileUrl' },
        { text: 'Mã phòng thuê', value: 'contractNumber' },
        { text: 'Tiền phòng', value: 'rentalPrice' },
        { text: 'Trạng thái', value: 'status' },
        { text: 'Mô tả', value: 'description' },
        { text: 'Người tạo', value: 'createdByUser' },
        { text: 'Người chỉnh sửa', value: 'updatedByUser' },
        { text: 'Ngày tạo', value: 'creationTime' },
        { text: 'Ngày chỉnh sửa', value: 'lastUpdateTime' },
        { text: 'Chức năng', value: 'actions', align: 'right' },
      ],
      categories: [],
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      currentItem: null,
      categoryId: null,
    }
  },
  methods: {
    async getListCategory() {
      await axios
        .get('http://localhost:5136/resort-manager/bill/get-all')
        .then((res) => {
          this.categories = res.data
          console.log(res.data)
        })
        .catch((eror) => {
          console.log(eror)
        })
    },
    deleteCategory() {
      axios.delete('http://localhost:5136/resort-manager/bill/delete/' + this.categoryId).then((res) => {
        if (res) {
          var newArr = this.categories.filter((x) => x.id != this.categoryId)
          this.categories = newArr
          this.dialogDelete = false
        }
      })
    },
  },
  created() {
    this.getListCategory()
  },
}
</script>

<style>
</style>