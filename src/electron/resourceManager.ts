import osUtils from "os-utils";
import fs from "fs";
import os from "os";

const POLLING_INTERVAL = 500; // mili seconds

export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    console.log({ cpuUsage, ramUsage, storageUsage: storageData.usage });
  }, POLLING_INTERVAL);
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem()) / 1024; // totalmem is stored in MB, so we divide by 1024.. to convert them into GB

  return { totalStorage, cpuModel, totalMemoryGB };
} // this is the data that won't change by time, so we don't need to update it every time, it is just static as mentioned in the function name.

function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  // requires node 18
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}
