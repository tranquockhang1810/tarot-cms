import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { defaultHomeRepository } from "@/api/features/home/HomeRepository"
import { DashboardModel } from "@/api/features/home/models/DashboardModel";
import { useEffect, useState } from "react";

const HomeViewModel = () => {
  const [resultObject, setResultObject] = useState<ResultObject | null>(null);
  const [tab, setTab] = useState<string>("bill");
  const [loading, setLoading] = useState(false);
  const [billChart, setBillChart] = useState<DashboardModel | null>(null);
  const [topicChart, setTopicChart] = useState<DashboardModel | null>(null);
  const [userChart, setUserChart] = useState<DashboardModel | null>(null);

  const getBillChart = async () => {
    try {
      setLoading(true);
      const res = await defaultHomeRepository.getBillChart();
      if (res?.data) {
        setBillChart(res?.data);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getTopicChart = async () => {
    try {
      setLoading(true);
      const res = await defaultHomeRepository.getTopicChart();
      if (res?.data) {
        setTopicChart(res?.data);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getUserChart = async () => {
    try {
      setLoading(true);
      const res = await defaultHomeRepository.getUserChart();
      if (res?.data) {
        setUserChart(res?.data);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    switch (tab) {
      case "bill":
        !billChart && getBillChart();
        break;
      case "topic":
        !topicChart && getTopicChart();
        break;
      case "user":
        !userChart && getUserChart();
        break;
      default:
        break;
    }
  }, [tab, billChart, topicChart, userChart]);

  return {
    resultObject,
    loading,
    tab,
    setTab,
    billChart,
    topicChart,
    userChart
  }
}

export default HomeViewModel