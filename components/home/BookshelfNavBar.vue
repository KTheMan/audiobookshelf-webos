<template>
  <div class="w-full bg-bg relative" :class="$platform === 'webos' ? 'h-16' : 'h-9'">
    <div id="bookshelf-navbar" class="absolute z-10 top-0 left-0 w-full h-full flex bg-secondary">
      <nuxt-link
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="h-full flex-grow flex items-center justify-center"
        :class="[routeName === item.routeName ? 'bg-primary' : 'text-fg-muted', $platform === 'webos' ? 'webos-nav-tab' : '']"
        :data-active="routeName === item.routeName"
      >
        <!-- webOS: always show icon stacked above label -->
        <template v-if="$platform === 'webos'">
          <span v-if="item.iconPack === 'abs-icons'" class="abs-icons" :class="`icon-${item.icon} text-xl`" />
          <span v-else :class="`${item.iconPack} text-xl leading-none`">{{ item.icon }}</span>
          <p class="text-xs font-medium mt-0.5 tracking-wide" :class="routeName === item.routeName ? 'text-fg' : ''">{{ item.text }}</p>
        </template>
        <!-- Mobile: active shows text label, inactive shows icon only -->
        <template v-else>
          <p v-if="routeName === item.routeName" class="font-semibold text-sm">{{ item.text }}</p>
          <span v-else-if="item.iconPack === 'abs-icons'" class="abs-icons" :class="`icon-${item.icon} ${item.iconClass || ''}`"></span>
          <span v-else :class="`${item.iconPack} ${item.iconClass || ''}`">{{ item.icon }}</span>
        </template>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    currentLibrary() {
      return this.$store.getters['libraries/getCurrentLibrary']
    },
    currentLibraryIcon() {
      return this.currentLibrary?.icon || 'database'
    },
    userHasPlaylists() {
      return this.$store.state.libraries.numUserPlaylists
    },
    userIsAdminOrUp() {
      return this.$store.getters['user/getIsAdminOrUp']
    },
    items() {
      let items = []
      if (this.isPodcast) {
        items = [
          {
            to: '/bookshelf',
            routeName: 'bookshelf',
            iconPack: 'abs-icons',
            icon: 'home',
            iconClass: 'text-xl',
            text: this.$strings.ButtonHome
          },
          {
            to: '/bookshelf/latest',
            routeName: 'bookshelf-latest',
            iconPack: 'abs-icons',
            icon: 'list',
            iconClass: 'text-xl',
            text: this.$strings.ButtonLatest
          },
          {
            to: '/bookshelf/library',
            routeName: 'bookshelf-library',
            iconPack: 'abs-icons',
            icon: this.currentLibraryIcon,
            iconClass: 'text-lg',
            text: this.$strings.ButtonLibrary
          }
        ]

        if (this.userIsAdminOrUp) {
          items.push({
            to: '/bookshelf/add-podcast',
            routeName: 'bookshelf-add-podcast',
            iconPack: 'material-symbols',
            icon: 'podcasts',
            iconClass: 'text-xl',
            text: this.$strings.ButtonAdd
          })
        }
      } else {
        items = [
          {
            to: '/bookshelf',
            routeName: 'bookshelf',
            iconPack: 'abs-icons',
            icon: 'home',
            iconClass: 'text-xl',
            text: this.$strings.ButtonHome
          },
          {
            to: '/bookshelf/library',
            routeName: 'bookshelf-library',
            iconPack: 'abs-icons',
            icon: this.currentLibraryIcon,
            iconClass: 'text-lg',
            text: this.$strings.ButtonLibrary
          },
          {
            to: '/bookshelf/series',
            routeName: 'bookshelf-series',
            iconPack: 'abs-icons',
            icon: 'columns',
            iconClass: 'text-lg pt-px',
            text: this.$strings.ButtonSeries
          },
          {
            to: '/bookshelf/collections',
            routeName: 'bookshelf-collections',
            iconPack: 'material-symbols',
            icon: 'collections_bookmark',
            iconClass: 'text-xl',
            text: this.$strings.ButtonCollections
          },
          {
            to: '/bookshelf/authors',
            routeName: 'bookshelf-authors',
            iconPack: 'abs-icons',
            icon: 'authors',
            iconClass: 'text-2xl',
            text: this.$strings.ButtonAuthors
          }
        ]
      }

      if (this.userHasPlaylists) {
        items.push({
          to: '/bookshelf/playlists',
          routeName: 'bookshelf-playlists',
          iconPack: 'material-symbols',
          icon: 'queue_music',
          iconClass: 'text-2xl',
          text: this.$strings.ButtonPlaylists
        })
      }

      return items
    },
    routeName() {
      return this.$route.name
    },
    isPodcast() {
      return this.libraryMediaType == 'podcast'
    },
    libraryMediaType() {
      return this.$store.getters['libraries/getCurrentLibraryMediaType']
    }
  },
  methods: {
    isSelected(item) {}
  },
  mounted() {}
}
</script>

<style>
#bookshelf-navbar {
  box-shadow: 0px 5px 5px #11111155;
}
#bookshelf-navbar a {
  font-size: 0.9rem;
}

/* TV nav tabs: flex-col stack, accent underline on active */
.webos-nav-tab {
  flex-direction: column;
}

.webos-nav-tab > * + * {
  margin-top: 2px;
}
.webos-nav-tab[data-active='true'] {
  border-bottom: 3px solid #1ad691;
  color: #1ad691;
}
.webos-nav-tab[data-active='false'] {
  border-bottom: 3px solid transparent;
}
.webos-nav-tab:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.06);
  border-bottom-color: rgba(26, 214, 145, 0.5);
}
</style>
