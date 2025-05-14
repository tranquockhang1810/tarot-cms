import { Spin } from "antd";
import { useCallback, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const UserChart = ({
  loading,
  labels,
  statics,
  avrAge
}: {
  loading: boolean,
  labels: string[],
  statics: number[],
  avrAge: number
}) => {
  const options: ApexCharts.ApexOptions = useMemo(() => {
    return {
      title: {
        text: `Năm sinh người dùng - Tuổi trung bình: ${avrAge}`,
        align: "center",
        style: { fontSize: "18px" }
      },
      chart: {
        type: "pie",
        height: 350,
      },
      labels: labels || [],
      legend: {
        position: 'bottom'
      }
    };
  }, [labels]);

  const Chart = useCallback(() => {
    return (
      <ReactApexChart
        options={options}
        series={statics}
        type="pie"
        height={500}
      />
    )
  }, [options, statics, avrAge]);

  return (
    <Spin size="large" tip="Loading..." spinning={loading}>
      <Chart />
    </Spin>
  );
};

export default UserChart;
