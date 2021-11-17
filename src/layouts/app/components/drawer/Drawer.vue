<template>
  <q-drawer
    v-model="drawer"
    :mini="miniDrawer"
    side="left"
    :width="320"
    :mini-width="56"
  >
    <div class="menu-wrapper">
      <div
        v-for="menu in menus"
        :key="menu.id"
        v-tooltip:primary.right="menu.label"
        class="menu"
        :class="{ active: activeMenu === menu.route }"
        @click="onMenuClick(menu.route)"
      >
        <div v-if="activeMenu === menu.route" class="indicator"></div>
        <q-icon
          :name="activeMenu === menu.route ? menu.activeIcon : menu.icon"
          size="20px"
        />
      </div>
    </div>
  </q-drawer>
</template>

<script>
export default {
  name: "Drawer",

  data() {
    return {
      drawer: true,
      miniDrawer: true,
      menus: [
        {
          id: this.$nano.id(),
          label: "dashboard",
          route: "dashboard",
          icon: "mdi-view-dashboard-outline",
          activeIcon: "mdi-view-dashboard",
        },
        {
          id: this.$nano.id(),
          label: "forms",
          route: "forms",
          icon: "eva-file-text-outline",
          activeIcon: "eva-file-text",
        },
        {
          id: this.$nano.id(),
          label: "help",
          route: "help",
          icon: "mdi-help-circle-outline",
          activeIcon: "mdi-help-circle",
        },
      ],
      activeMenu: "",
    };
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.activeMenu = this.$route.name;
      },
    },
  },

  methods: {
    onMenuClick(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid $gray-2;

  .menu {
    height: 56px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: $gray;

    .indicator {
      height: 36px;
      width: 4px;
      background-color: $secondary;
      position: absolute;
      left: 0;
      border-radius: 0px 4px 4px 0px;
    }

    &:hover {
      color: $secondary;
      cursor: pointer;
    }
  }

  .menu.active {
    color: $primary;
  }
}
</style>
