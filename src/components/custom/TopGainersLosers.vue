<template>
  <div class="top-gainers-and-losers">
    <div class="header">
      <span
        @click="setGainers"
        class="link"
        :class="{ active: activeData === 'gainers' }"
      >
        Top Gainers
      </span>
      <span
        @click="setLosers"
        class="link"
        :class="{ active: activeData === 'losers' }"
      >
        Top Losers
      </span>
    </div>
    <div class="content">
      <div
        v-for="(dataPoint, i) in dataPoints"
        :key="`${i}-${dataPoint.symbol}`"
        class="script-info"
      >
        <span>
          {{ dataPoint.symbol }}
        </span>
        <span>
          <span>
            {{ dataPoint.ltp }}
          </span>
          <span
            :class="{
              gain: profit(dataPoint) > 0,
              loss: profit(dataPoint) < 0,
            }"
          >
            ({{
              profit(dataPoint) > 0
                ? `+${profit(dataPoint)}`
                : `${profit(dataPoint)}`
            }})
          </span>
        </span>
      </div>
    </div>
    <div class="footer">
      <span
        @click="currentPage = 1"
        :class="{
          active: activeData === 'gainers',
          disabled: currentPage === 1,
        }"
      >
        <inline-svg :src="LeftRayIcon" />
      </span>
      <span
        @click="currentPage = 2"
        :class="{
          active: activeData === 'losers',
          disabled: currentPage === 2,
        }"
      >
        <inline-svg :src="RightRayIcon" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Gainer, Loser } from "@/types";
import { get, nseTopGainersUrl, nseTopLosersUrl, roundOff } from "@/utils";
import { topGainersMocked, topLosersMocked } from "@/mocks";
import { RightRayIcon, LeftRayIcon } from "@/components/assets/svgs";

@Component({
  name: "TopGainersLosers",
})
export default class TopGainersLosers extends Vue {
  activeData = "gainers";

  currentPage = 1;

  topGainers: Gainer[] = [];

  topLosers: Loser[] = [];

  get dataPoints(): Gainer[] {
    if (this.activeData === "gainers") {
      if (this.currentPage === 1) {
        return this.topGainers?.slice(0, 5);
      } else {
        return this.topGainers?.slice(5);
      }
    } else {
      if (this.currentPage === 1) {
        return this.topLosers?.slice(0, 5);
      } else {
        return this.topLosers?.slice(5);
      }
    }
  }

  mounted(): void {
    if (process.env.NODE_ENV !== "development") {
      setTimeout(() => {
        get(nseTopGainersUrl).then((res) => {
          this.topGainers = [...res.data];
        });
        get(nseTopLosersUrl).then((res) => {
          this.topLosers = [...res.data];
        });
      }, 0);
    } else if (process.env.NODE_ENV === "development") {
      this.topGainers = topGainersMocked.data;
      this.topLosers = topLosersMocked.data;
    }
  }

  setGainers(): void {
    this.activeData = "gainers";
    this.currentPage = 1;
  }

  setLosers(): void {
    this.activeData = "losers";
    this.currentPage = 1;
  }

  profit(dataPoint: Gainer): number {
    const ltp = parseFloat(dataPoint.ltp.replaceAll(",", ""));
    const pp = parseFloat(dataPoint.previousPrice.replaceAll(",", ""));

    return roundOff(((ltp - pp) * 100) / pp);
  }

  RightRayIcon = RightRayIcon;

  LeftRayIcon = LeftRayIcon;
}
</script>

<style lang="scss">
[data-theme="light"] {
  .top-gainers-and-losers {
    background: white;
    color: #333333;

    .header {
      border-bottom: 2px solid #333;
    }

    .content {
      span {
        &.gain {
          color: #019c3d;
        }
        &.loss {
          color: #ff5d5d;
        }
      }
    }

    .footer {
      border-top: 2px solid #333;
    }
  }
}
[data-theme="dark"] {
  .top-gainers-and-losers {
    background: #111;
    color: white;

    .header {
      border-bottom: 2px solid white;
    }

    .content {
      span {
        &.gain {
          color: #25d61f;
        }
        &.loss {
          color: #ff5d5d;
        }
      }
    }

    .footer {
      border-top: 2px solid white;

      span {
        margin: 0 0.5em;
      }
    }
  }
}
.top-gainers-and-losers {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 0.5em;
  border-radius: 6px;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 0 0.4em 0;
    margin: 0 0.35em 0.4em 0.35em;
    font-size: 1.4em;
    font-weight: bold;

    .link {
      cursor: pointer;
      opacity: 0.4;

      &.active {
        opacity: 1;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    .script-info {
      display: flex;
      justify-content: space-between;
      margin: 0.4em;

      span {
        &.gain,
        &.loss {
          font-weight: 600;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin: 0 0.5em 0.25em 0.5em;
    border-top: 1px;
    padding-top: 0.5em;

    span {
      cursor: pointer;

      &.disabled {
        opacity: 0.4;
      }
    }
  }
}
</style>
