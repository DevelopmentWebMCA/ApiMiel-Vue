<template>
  <div class="p-2">
    <br />
    <br />
    <b-container fluid class="mt--12">
      <b-row>
        <b-col>
          <h1 class="mb-3">Inicio</h1>
        </b-col>
      </b-row>

      <!-- <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 mb-5 bg-white rounded"
      >
        <h2 align = "center">Número de usuarios</h2>
        <hr />

        <div class="chart">
          <bar-chart :chart-data="chartData" :height="350" />
        </div>
      </b-jumbotron> -->
    </b-container>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Components
import BaseProgress from "@/components/BaseProgress";
import StatsCard from "@/components/Cards/StatsCard";

// Tables
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageVisitsTable from "./Dashboard/PageVisitsTable";
import axios from "axios";

export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    
    return {
      users: [],
      cantidad: 10,
        chartData: {
          labels: ["Investidagores", "Apicultores", "Administradores"],
          datasets: [
            {
              data: [1,10,2],
              backgroundColor: '#FFD875',
            },
          ],
        },
        extraOptions: chartConfigs.blueChartOptions,
    };
  },
  methods: {
  },
  created(){
  }
};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
