import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployVerifiers: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("BalloonToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};

export default deployVerifiers;
deployVerifiers.tags = ["BalloonToken"];
