<template>
  <q-drawer
    v-model="drawer"
    :mini="miniDrawer"
    side="left"
    :width="320"
    :mini-width="56"
  >
    <div class="menu-wrapper">
      <template v-for="menu in menus">
        <q-space v-if="menu.type === 'SPACE'" :key="menu.id" />

        <div
          v-else
          :key="menu.id"
          v-tooltip:primary.right="menu.label"
          class="menu"
          :class="{ active: activeMenu === menu.route }"
          @click="activeMenu = menu.route"
        >
          <div v-if="activeMenu === menu.route" class="indicator"></div>
          <q-icon
            :name="activeMenu === menu.route ? menu.activeIcon : menu.icon"
            size="20px"
          />
        </div>
      </template>
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
          type: "MENU",
          label: "dashboard",
          route: "dashboard",
          icon: "mdi-view-dashboard-outline",
          activeIcon: "mdi-view-dashboard",
        },
        {
          id: this.$nano.id(),
          type: "MENU",
          label: "draft",
          route: "draft",
          icon: "mdi-text-box-outline",
          activeIcon: "mdi-text-box",
        },
        {
          id: this.$nano.id(),
          type: "MENU",
          label: "favorite",
          route: "favorite",
          icon: "eva-star-outline",
          activeIcon: "eva-star",
        },
        {
          id: this.$nano.id(),
          type: "MENU",
          label: "archive",
          route: "archive",
          icon: "eva-archive-outline",
          activeIcon: "eva-archive",
        },
        {
          id: this.$nano.id(),
          type: "MENU",
          label: "trash",
          route: "trash",
          icon: "eva-trash-2-outline",
          activeIcon: "eva-trash-2",
        },
        {
          id: this.$nano.id(),
          type: "SPACE",
        },
        {
          id: this.$nano.id(),
          type: "MENU",
          label: "help",
          route: "help",
          icon: "mdi-help-circle-outline",
          activeIcon: "mdi-help-circle",
        },
      ],
      activeMenu: "draft",
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

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
