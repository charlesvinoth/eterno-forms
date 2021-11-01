<template>
  <div class="time-picker">
    <!-- hours -->

    <div class="units hours">
      <BaseScrollbar height="240px" class="q-pr-sm">
        <div
          v-for="_hour in hours"
          :key="_hour"
          class="unit"
          :class="{
            'is-active': hour === _hour,
            'is-disabled': !isValidHour(_hour),
          }"
          @click="setTime(_hour, 'hour')"
        >
          {{ _hour === "00" ? "12" : _hour }}
        </div>
      </BaseScrollbar>
    </div>

    <!-- ... -->

    <!-- minutes -->

    <div class="units minutes">
      <BaseScrollbar height="240px" class="q-pr-sm">
        <div
          v-for="_minute in minutes"
          :key="_minute"
          class="unit"
          :class="{
            'is-active': _minute === minute,
            'is-disabled': !isValidMinute(_minute),
          }"
          @click="setTime(_minute, 'minute')"
        >
          {{ _minute }}
        </div>
      </BaseScrollbar>
    </div>

    <!-- ... -->

    <!-- meridians -->

    <div class="units meridians">
      <div
        v-for="_meridian in meridians"
        :key="_meridian"
        class="unit"
        :class="{
          'is-active': _meridian === meridian,
          'is-disabled': !isValidMeridian(_meridian),
        }"
        @click="setTime(_meridian, 'meridian')"
      >
        {{ _meridian }}
      </div>
    </div>

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "TimePicker",

  props: {
    value: {
      type: String,
      required: true,
    },

    minTime: {
      type: String,
      default: "",
    },

    maxTime: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      hours: [],
      minutes: [],
      meridians: ["AM", "PM"],
      hour: "",
      minute: "",
      meridian: "",
    };
  },

  created() {
    this.initialize();
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.value) {
          const { hour, minute, meridian } = this.splitTime(this.value);
          this.hour = hour === "12" ? "00" : hour;
          this.minute = minute;
          this.meridian = meridian;
        } else {
          this.hour = "";
          this.minute = "";
          this.meridian = "";
        }
      },
    },
  },

  methods: {
    appendZeroIfNeeded(unit) {
      return unit < 10 ? `0${unit}` : `${unit}`;
    },

    initialize() {
      // add 0 to 11 hours

      for (let i = 0; i <= 11; i++) {
        this.hours.push(this.appendZeroIfNeeded(i));
      }

      // add 0 to 59 minutes

      for (let i = 0; i <= 59; i++) {
        this.minutes.push(this.appendZeroIfNeeded(i));
      }
    },

    // helper method to split time

    splitTime(value) {
      const [time, meridian] = value.split(" ");
      const [hour, minute] = time.split(":");

      return { hour, minute, meridian };
    },

    // helper method to split min time

    splitMinTime() {
      const { hour, minute, meridian } = this.splitTime(this.minTime);

      return {
        minHour: hour || "00",
        minMinute: minute || "00",
        minMeridian: meridian || "AM",
      };
    },

    // helper method to split max time

    splitMaxTime() {
      const { hour, minute, meridian } = this.splitTime(this.maxTime);

      return {
        maxHour: hour || "12",
        maxMinute: minute || "59",
        maxMeridian: meridian || "PM",
      };
    },

    isValidMeridian(meridian) {
      const { minMeridian } = this.splitMinTime();
      const { maxMeridian } = this.splitMaxTime();

      if (minMeridian === maxMeridian) {
        this.meridian = this.meridian || minMeridian;
        return meridian === minMeridian;
      }

      this.meridian = this.meridian || "AM";
      return true;
    },

    isValidHour(hour) {
      const { minHour, minMeridian } = this.splitMinTime();
      const { maxHour, maxMeridian } = this.splitMaxTime();

      // if both the min & max meridians are same

      if (minMeridian === maxMeridian && this.meridian === minMeridian) {
        return hour >= Number(minHour) && hour <= Number(maxHour);
      }

      // if both the min & max meridians are not same

      if (minMeridian !== maxMeridian) {
        if (this.meridian === minMeridian) {
          return hour >= Number(minHour);
        }

        if (this.meridian === maxMeridian) {
          return hour <= Number(maxHour);
        }
      }
    },

    isValidMinute(minute) {
      const { minHour, minMinute, minMeridian } = this.splitMinTime();
      const { maxHour, maxMinute, maxMeridian } = this.splitMaxTime();

      if (this.hour === minHour && this.meridian === minMeridian) {
        return Number(minute) >= Number(minMinute);
      }

      if (this.hour === maxHour && this.meridian === maxMeridian) {
        return Number(minute) <= Number(maxMinute);
      }

      return true;
    },

    // reset hour if it is lesser/greater than min/max hour

    resetHour() {
      const { minHour } = this.splitMinTime();
      const { maxHour } = this.splitMaxTime();

      if (Number(this.hour) < Number(minHour)) {
        this.hour = minHour;
        return;
      }

      if (Number(this.hour) > Number(maxHour)) {
        this.hour = maxHour;
        return;
      }
    },

    // reset minute if it is lesser/greater than min/max minute

    resetMinute() {
      const { minHour, minMinute, minMeridian } = this.splitMinTime();
      const { maxHour, maxMinute, maxMeridian } = this.splitMaxTime();

      // if selected minute is less than min minute

      if (
        this.hour === minHour &&
        this.meridian === minMeridian &&
        Number(this.minute) < Number(minMinute)
      ) {
        this.minute = minMinute;
        return;
      }

      // if selected minute is greater than max minute

      if (
        this.hour === maxHour &&
        this.meridian === maxMeridian &&
        Number(this.minute) > Number(maxMinute)
      ) {
        this.minute = maxMinute;
        return;
      }

      // if minute is empty

      this.minute = this.minute || "00";
    },

    setTime(unit, type) {
      if (type === "hour") {
        this.hour = unit;
        this.resetMinute();
      }

      if (type === "minute") {
        this.minute = unit;
      }

      if (type === "meridian") {
        this.meridian = unit;
        this.resetHour();
        this.resetMinute();
      }

      const hour = this.hour === "00" ? "12" : this.hour;
      console.log(`${hour}:${this.minute} ${this.meridian}`);
      this.$emit("input", `${hour}:${this.minute} ${this.meridian}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.time-picker {
  display: flex;
  width: 200px;
  padding: 8px 0px;
}

.units {
  text-align: center;
}

.hours {
  width: 76px;
}

.minutes {
  width: 76px;
}

.meridians {
  width: 68px;
}

.unit {
  color: $gray-10;
  padding: 4px 8px;
  margin: 0px 4px;
  user-select: none;
  border-radius: 4px;
}

.unit:hover {
  cursor: pointer;
  background-color: $gray-2;
}

.unit.is-active {
  color: white;
  background-color: $primary;
}

.unit.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
