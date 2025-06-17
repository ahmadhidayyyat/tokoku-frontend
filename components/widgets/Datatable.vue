<template>
  <div
    class="overflow-x-auto bg-[#30394a] rounded-xl px-3 text-white overflow-y-visible"
  >
    <table class="min-w-full text-sm overflow-hidden">
      <thead>
        <tr>
          <th
            v-if="showRowNumbers"
            class="px-4 py-2 text-left font-medium text-yellow rounded-l-[8px]"
          >
            No
          </th>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="px-4 py-2 text-left font-medium text-yellow last:rounded-r-[8px]"
            :class="[{ 'first:rounded-l-[8px]': !showRowNumbers }]"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="border-t font-semibold"
        >
          <td v-if="showRowNumbers" class="px-4 py-2 text-white rounded-l">
            {{ rowIndex + 1 }}
          </td>
          <td
            v-for="(value, colIndex) in columnsVisible"
            :key="colIndex"
            class="px-4 py-2 text-white"
            :class="[{ 'first:rounded-l-[8px]': !showRowNumbers }]"
          >
            <template v-if="$slots[`cell-${colIndex}`]">
              <slot
                :name="`cell-${colIndex}`"
                :item="value"
                :index="colIndex"
              ></slot>
            </template>
            <template v-else>
              <div v-if="value.includes('custom')" class="flex gap-1">
                <div
                  v-for="(column, columnIdx) in customColumns"
                  :key="columnIdx"
                >
                  <div v-for="(temp, tempIdx) in column" :key="tempIdx">
                    <div v-if="value === temp.name" class="py-1">
                      <component :is="temp.component" v-bind="row" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="value.includes('loop')" class="flex gap-1">
                <div
                  v-for="(loopItem, loopIdx) in row[value.split(':')[1]]"
                  :key="loopIdx"
                >
                  {{ loopItem[value.split(":")[2]] }},
                </div>
              </div>
              <div v-else-if="value.includes('img')" class="max-w-16">
                <img
                  :src="`${baseURL}/${row[value.split(':')[1]]}`"
                  alt=""
                  class="max-w-32 my-3"
                />
              </div>
              <div v-else-if="value.includes('tooltip')">
                <div
                  class="bg-[#B346501A] w-fit text-[#B34650] rounded-full px-2 py-1"
                >
                  {{ row[value.split(":")[2]] }}
                </div>
              </div>
              <div v-else>
                <span v-html="truncateHtml(row[value], 200)"></span>
              </div>
            </template>
          </td>
          <td
            v-if="showButtonAction"
            class="px-4 py-2 text-white rounded-r relative"
          >
            <div v-if="actionWithoutDropdown">
              <WidgetsButtonBaseButton
                v-for="(action, actionIndex) in actions"
                :key="actionIndex"
                :variant="action.btnVariant"
                @click="handleAction(action, row)"
                class="rounded-lg mr-2"
              >
                <component class="mr-1" :is="action.icon"></component>
                {{ action.label }}
              </WidgetsButtonBaseButton>
            </div>
            <div v-else>
              <button
                @click="toggleDropdown(rowIndex)"
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 border border-slate-400 flex flex-row items-center gap-2"
              >
                Aksi
                <IconsChevron class="-rotate-180" width="15" height="15" />
              </button>
              <div
                v-if="openDropdown === rowIndex"
                class="fixed mt-2 w-32 -translate-x-[3.1rem] bg-[#30394a] border border-slate-200 rounded-lg shadow-lg z-40"
              >
                <button
                  v-for="(action, actionIndex) in actions"
                  :key="actionIndex"
                  @click="handleAction(action, row)"
                  class="w-full px-4 py-2 text-left text-white first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 hover:bg-slate-600 flex flex-row gap-2 items-center text-xs"
                >
                  <component :is="action.icon"></component>
                  {{ action.label }}
                </button>
              </div>
            </div>
          </td>
        </tr>

        <tr v-if="data.length === 0">
          <td
            :colspan="
              headers.length +
              (showRowNumbers ? 1 : 0) +
              (showButtonAction ? 1 : 0)
            "
            class="pt-2"
          >
            <div
              class="text-center rounded-[8px] p-4 text-danger font-bold text-base"
            >
              <h1 v-if="!loading">Tidak Ada Data Yang Di Temukan</h1>
              <h1 v-if="loading">Tunggu Sejenak</h1>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { truncateHtml } from "~/function/truncateHtml";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;

const openDropdown = ref(null);

const toggleDropdown = (index) => {
  if (openDropdown.value == null) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  openDropdown.value = openDropdown.value === index ? null : index;
};

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  actions: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showRowNumbers: {
    type: Boolean,
    default: false,
  },
  showButtonAction: {
    type: Boolean,
    default: false,
  },
  columnsVisible: {
    type: Array,
    default: () => [],
  },
  customColumns: {
    type: Array,
    default: () => [],
  },
  actionWithoutDropdown: {
    type: Boolean,
    default: false,
  },
});

const handleAction = (action, row) => {
  document.body.classList.remove("no-scroll");

  if (typeof action.onClick === "function") {
    action.onClick(row);
  }
};
</script>

<style>
.no-scroll {
  overflow: hidden;
}
</style>
