import useColor from "@/hooks/useColor";
import { CurrencyFormat } from "@/utils/helper/CurrencyFormat";
import { Spin } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const BillChart = ({
  loading,
  labels,
  statics
}: {
  loading: boolean,
  labels: string[],
  statics: number[]
}) => {
  const { brandPrimary } = useColor();
  const options: ApexCharts.ApexOptions = useMemo(() => {
    return {
      title: {
        text: `Doanh thu ${dayjs().subtract(1, 'year').format('MM/YYYY')} - ${dayjs().format('MM/YYYY')}`
      },
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
        selection: {
          enabled: true,
        }
      },
      colors: [brandPrimary],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: labels || [],
      },
      yaxis: {
        title: {
          text: '(VNĐ)'
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return CurrencyFormat(val)
          }
        }
      },
    }
  }, [brandPrimary, labels, statics]);

  return (
    <Spin size="large" tip="Loading..." spinning={loading}>
      <ReactApexChart
        options={options}
        series={
          [{
            name: 'Doanh thu',
            data: statics || []
          }]
        }
        type="bar"
        height={500}
      />
    </Spin>
  )
}

export default BillChart