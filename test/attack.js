const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber, utils } = require("ethers");

describe("Attack", function () {
  it("Attack the contract by guessing the correct number", async function () {
    const Game = await ethers.getContractFactory("Game");
    const gameContract = await Game.deploy({ value: utils.parseEther("0.1") });
    await gameContract.deployed();
    console.log(`Game contract address : ${gameContract.address}`);

    const Attack = await ethers.getContractFactory("Attack");
    const attackContract = await Attack.deploy(gameContract.address);
    await attackContract.deployed();
    console.log(`Attack contract address : ${attackContract.address}`);

    const tx = await attackContract.attack();
    await tx.wait();

    const balanceGame = await gameContract.getBalance();
    expect(balanceGame).to.equal(BigNumber.from("0"));
  });
});
