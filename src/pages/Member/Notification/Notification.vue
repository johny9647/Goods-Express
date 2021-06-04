<template>
  <div>
    GPS position: <strong>{{ position }}</strong>
    eyy
  </div>
</template>

<script>
import { Plugins } from '@capacitor/core'

const { Geolocation } = Plugins

export default {
  data () {
    return {
      position: 'determining...'
    }
  },
  methods: {
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        console.log('Current', position);
        this.position = position
      });
    }
  },
  mounted () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      console.log('New GPS position')
      this.position = position
    })
  },
  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }
}
</script>