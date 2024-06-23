import { ethers } from "ethers";
import CrowdfundingABI from "../src/abi/Crowdfunding";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const crowdfundingAddress = "0x38420dF5F67DEbE6d6f62176582FB36cF49a0B65";
const crowdfundingContract = new ethers.Contract(
  crowdfundingAddress,
  CrowdfundingABI,
  signer
);

export const getProjectDetails = async (projectId) => {
  try {
    const project = await crowdfundingContract.getProjectDetails(projectId);
    return project;
  } catch (error) {
    console.error("Error fetching project details:", error);
  }
};

export const getAllProjects = async () => {
  try {
    const projectIdCounter = await crowdfundingContract.projectIdCounter();
    const projects = [];
    for (let i = 1; i < projectIdCounter; i++) {
      const project = await getProjectDetails(i);
      projects.push(project);
    }
    console.log(projects[1]);
    return projects;
  } catch (error) {
    console.error("Error fetching all projects:", error);
  }
};
