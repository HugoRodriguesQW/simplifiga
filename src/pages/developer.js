/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from "../components/Header";
import styles from "../styles/pages/Developer.module.css";
import { useContext, useEffect, useState } from "react";
import { DeveloperHead } from "../components/Head/DeveloperHead";
import reactStringReplace from "react-string-replace";
import contents from "./api/docapi.json";
import Link from "next/link";
import copy from "copy-to-clipboard";
import { Footer } from "../components/Footer";
import { userContext } from "../contexts/UserContext";
import { DeveloperSideBar } from "../components/Developer/DeveloperSideBar";
import Codes from "../utils/codes/v1";

export default function Developer() {
  const { logged } = useContext(userContext);

  const [version, setVersion] = useState(Object.keys(contents)[0]);
  const [content, setContent] = useState(contents[version]);

  useEffect(() => {
    setContent(contents[version]);
  }, [version]);

  function handleVersionSelect({ target }) {
    setVersion(target.value);
  }

  return (
    <>
      <DeveloperHead />
      {logged ? (
        <Header
          fixed
          padding
          routes={[
            "/pricing",
            "/support",
            "/dashboard",
            "/developer",
            "/",
            "Sair",
          ]}
        />
      ) : (
        <Header fixed padding routes={["/user/register", "/user/login", "/"]} />
      )}

      <div className={styles.developerContainer}>
        <DeveloperSideBar content={content} />
        <div className={styles.developerContent}>
          <div>
            <h1>
              A API do Simplifiga
              <span>{content.version}</span>
            </h1>
            <div className={styles.versionControl}>
              <select onChange={handleVersionSelect}>
                {Object.keys(contents).map((version, id) => {
                  return (
                    <option value={version} key={version + id}>
                      {version}
                    </option>
                  );
                })}
              </select>
              <p>
                {content.path}
                <span>License: {content.license}</span>
              </p>
            </div>

            {content.document.map((component) => {
              return Object.keys(component).map((elem, i) => {
                return (
                  <div key={elem + i}>
                    {Elements[elem]?.(component[elem], content)}
                  </div>
                );
              });
            })}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

const Elements = {
  title(str) {
    return <h4>{str}</h4>;
  },
  subtitle(str) {
    return <h5>{str}</h5>;
  },
  content(str, context) {
    const [linkStrings, links] = linkSearcher(str, context);

    const replaced = replaceTextWithLinks(linkStrings, links, str);
    return <p>{replaced}</p>;
  },
  anchor(data) {
    return <span id={data[0]}></span>;
  },
  link(id, { reference }) {
    if (!reference[id]) return null;
    if (reference[id]?.[2] === "newtab") {
      return (
        <a target="_blank" rel="noreferrer" href={reference[id][1]}>
          {reference[id][0]}
        </a>
      );
    }
    return <Link href={reference[id][1]}>{reference[id][0]}</Link>;
  },
  description(str) {
    return <span className={styles.description}>{str}</span>;
  },
  code(name) {
    const code = Codes[name]?.();
    return (
      <pre className={styles.code}>
        <button
          onClick={() => {
            copy(code);
          }}
        >
          <img src="/icons/copy-alt.svg" alt="copy-to-clipboard" />
        </button>
        {code}
      </pre>
    );
  },
  list(objs, context) {
    return (
      <div>
        <ol>
          {Object.keys(objs).map((i, index) => {
            const elements = Object.keys(objs[i]).map((item) => {
              return this[item]?.(objs[i][item], context) ?? null;
            });

            return (
              <li key={i + index}>
                <strong>{objs[i].name} </strong>
                {}
                {elements}
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
  table(data) {
    return (
      <div
        className={`${styles.table} ${
          (data.length - 1) % 2 ? null : styles.threeColors
        }`}
      >
        {data.map((column, i) => {
          return (
            <div
              className={styles.tableRow}
              key={`column-${i}-${Math.random()}`}
            >
              {column.map((cell, i) => {
                return (
                  <div
                    className={`${styles.tableCell} ${
                      styles[cell.split(" ").shift()]
                    }`}
                    key={cell + i + Math.random()}
                  >
                    <p>{cell}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
  multiple(content, context) {
    const id = Math.round(Math.random() * 999999);
    function handleTabButtonDown(name, { target }) {
      const tabcontent = document.getElementsByClassName(`tab_content_${id}`);
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(
          " " + styles.activeTabContent,
          ""
        );
      }

      const tablinks = document.getElementsByClassName(`tab_links_${id}`);
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
          " " + styles.activeTabLink,
          ""
        );
      }

      document.getElementById(`tabs_${name}_${id}`).className +=
        " " + styles.activeTabContent;
      if (target) target.className += " " + styles.activeTabLink;
    }

    return (
      <div className={styles.tabs}>
        <div className={styles.buttonsBox}>
          <div>
            {content.data.map((item, i) => {
              return (
                <button
                  className={`${`tab_links_${id}`} ${
                    i === 0 ? styles.activeTabLink : null
                  }`}
                  onClick={(e) => {
                    handleTabButtonDown(item.name.split(" ").shift(), e);
                  }}
                  key={item.name + i}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <span>{content.title}</span>
        </div>
        <div className={styles.tabsContent}>
          {content.data.map((item, i) => {
            const elems = Object.keys(item).splice(1);
            return (
              <div
                className={`${`tab_content_${id}`} ${
                  i === 0 ? styles.activeTabContent : null
                }`}
                id={`tabs_${item.name.split(" ").shift()}_${id}`}
                key={i + item.name}
              >
                {elems.map((elem) => {
                  return Elements[elem]?.(item[elem], context);
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

function linkSearcher(str, context) {
  const linkStrings = str.match(/\\@|@(?:\\{|[^@])*@|(\+)/g);
  const links = [];
  for (const t in linkStrings) {
    const id = parseInt(linkStrings[t].replace("@link", "").replace("@", ""));
    links.push({
      id,
      element: Elements.link(id, { reference: context.reference }),
    });
  }

  return [linkStrings, links];
}

function replaceTextWithLinks(linkStrings, links, str) {
  if (!linkStrings) return str;
  const newStr = [];
  linkStrings.forEach((l, i) => {
    if (i === 0) {
      newStr[0] = {
        before: str.split(l)[0] + l,
        after: str.split(l)[1],
      };
      return;
    }
    const old = newStr[i - 1].after;
    newStr[i] = {
      before: old.split(l)[0] + l,
      after: old.split(l)[1],
    };
  });

  return newStr.map((current, index) => {
    const id = links[index].id;
    return reactStringReplace(
      index === newStr.length - 1
        ? current.before + current.after
        : current.before,
      `@link${id}@`,
      () => {
        return links[index].element;
      }
    );
  });
}
