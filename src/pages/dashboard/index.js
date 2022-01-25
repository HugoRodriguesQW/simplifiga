/* eslint-disable react-hooks/exhaustive-deps */
import Router from "next/router";
import { useContext, useEffect } from "react";
import { Header } from "../../components/Header";
import styles from "../../styles/pages/Dashboard.module.css";
import { Footer } from "../../components/Footer";
import { BasicAnalytics } from "../../components/Dashboard/BasicAnalytics";
import { BasicUserInfo } from "../../components/Dashboard/BasicUserInfo";
import { userContext } from "../../contexts/UserContext";
import { BasicLocations } from "../../components/Dashboard/BasicLocations";
import { BasicReference } from "../../components/Dashboard/BasicReference";
import { SideBar } from "../../components/Dashboard/SideBar";
import { DashboardHead } from "../../components/Head/DashboardHead";

export default function Dashboard() {
  const { logged } = useContext(userContext);

  useEffect(() => {
    if (logged === false) Router.push("/user/login");
  }, [logged]);

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHead index />
      {logged ? (
        <>
          <Header
            fixed
            padding
            routes={["/pricing", "/dashboard", "/developer", "/", "Sair"]}
          />
          <SideBar current="/dashboard" />

          <div className={styles.dashboardContent}>
            <BasicAnalytics />
            <BasicUserInfo />
            <BasicReference />
            <BasicLocations />

            <Footer />
          </div>
        </>
      ) : null}
    </div>
  );
}
