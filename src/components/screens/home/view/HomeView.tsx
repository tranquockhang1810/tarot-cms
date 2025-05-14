'use client';
import { Tabs } from "antd";
import BillChart from "./TabViews/BillChart";
import HomeViewModel from "../viewModel/HomeViewModel";
import { showToast } from "@/utils/helper/SendMessage";
import { useCallback, useEffect } from "react";
import TopicChart from "./TabViews/TopicChart";
import UserChart from "./TabViews/UserChart";

const HomeView = () => {
  const {
    resultObject,
    loading,
    tab,
    setTab,
    billChart,
    topicChart,
    userChart
  } = HomeViewModel();

  useEffect(() => {
    if (resultObject?.type) {
      showToast({
        type: resultObject?.type,
        content: resultObject?.content
      });
    }
  }, [resultObject]);

  return (
    <div className="max-h-screen overflow-y-auto p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Thống kê hệ thống</div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg h-full">
        <Tabs
          defaultActiveKey="bill"
          centered
          items={[
            {
              label: 'Doanh thu',
              key: 'bill',
              children: <BillChart
                loading={loading}
                labels={billChart?.labels || []}
                statics={billChart?.statics || []}
              />,
            },
            {
              label: 'Chủ đề chat',
              key: 'topic',
              children: <TopicChart
                loading={loading}
                labels={topicChart?.labels || []}
                statics={topicChart?.statics || []}
              />,
            },
            {
              label: 'Người dùng',
              key: 'user',
              children: <UserChart
                loading={loading}
                labels={userChart?.labels || []}
                statics={userChart?.statics || []}
                avrAge={userChart?.avrAge || 0}
              />,
            },
          ]}
          onChange={(key) => setTab(key)}
        />
      </div>
    </div>
  );
};

export default HomeView;
