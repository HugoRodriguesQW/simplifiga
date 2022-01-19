import gstyles from "../../styles/components/global.module.css";
import { Pie } from "react-chartjs-2";
import { Color } from "../../utils/randomColor";
import { useContext } from "react";
import { dashboardContext } from "../../contexts/DashboardContext";
import { Loading } from "../Effects/Loading";
import { Empty } from "../Effects/Empty";

export function BasicLocations() {
  const loading = useContext(dashboardContext).loading;
  const locations = useContext(dashboardContext)
    .locations.map((local) => {
      return local.regions.map((region) => {
        return { ...region, country: local.country };
      });
    })
    .flat()
    .sort((a, b) => {
      return b.clicks - a.clicks;
    })
    .slice(0, 5);

  const data = locations.map((local) => {
    return local.clicks;
  });

  const pieDatas = {
    labels: locations.map((local) => {
      return local.name;
    }),
    datasets: [
      {
        data,
        backgroundColor: data.map(() => {
          return Color();
        }),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      {loading && (
        <div>
          <Loading height="20rem" />
        </div>
      )}
      {!loading && (
        <div className={`${gstyles.basicFlexBox} ${gstyles.withGraphs}`}>
          {locations.length === 0 ? (
            <Empty height="20rem" />
          ) : (
            <>
              <div>
                <div className={gstyles.basicInfoBox}>
                  <span>Principais regiões</span>
                  <strong>{data.length}</strong>
                </div>
                <div className={gstyles.basicGraphBox}>
                  <Pie
                    data={pieDatas}
                    options={{ plugins: { legend: false } }}
                  />
                </div>
              </div>
              <div className={gstyles.basicInfoDetails}>
                {locations.map(({ name, country }, index) => {
                  const currentData = data[index];
                  const percent = (
                    (currentData /
                      data.reduce((p, c) => {
                        return p + c;
                      })) *
                    100
                  ).toFixed(2);
                  return (
                    <div key={name + country + index}>
                      <span>{name}</span>
                      <p>{country}</p>
                      <p>{currentData} cliques</p>
                      <p>{percent}%</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
