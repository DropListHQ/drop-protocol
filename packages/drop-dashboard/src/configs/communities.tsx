interface INameToValueMap {
  [key: string]: any;
}

const communities: INameToValueMap = {
  "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": {
    logo: "https://lh3.googleusercontent.com/Mf4vImKbzrJUcj7f7RZNOl9iZSEEJgkvpiUp9ugXc9dcpxFe6fvVgxYcRmTI1PnvfL_X1bD3mH4e66j6aJhqLEYm0vvpC8Jy8XJNZOI=s130",
    url: "http://143.198.170.36:8000/subgraphs/name/nft-owners-boredapeyc/graphql",
    name: "Bored Ape",
    numOwners: "100"
  },
  "0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38": {
    logo: "https://lh3.googleusercontent.com/gp39NTyxBPazqowYV9XTFxAU4eNk1i7FlmonHW4Zr7eS9UxEvrZ7f04rOLEhDxcuGxsbUx1Rm_N6Ky_Dp4A1ZQYHFAaEWj5YdBF0qg=s130",
    url: "https://api.studio.thegraph.com/query/9599/sandbox-owners/0.0.1",
    name: "Sandbox",
    numOwners: "100"
  },
  "0x79fcdef22feed20eddacbb2587640e45491b757f": {
    logo: "https://lh3.googleusercontent.com/72591rGu5Q4R7JeUjXyc1ZH2QJ2CW64OwKQ4Ec9Hf1_z8W6IgXNummT2ErPy80zh0DoUY8KXUXZdvgeUUw9HeIz8L11sYeNqTyD21y0=s130",
    url: "https://api.studio.thegraph.com/query/9599/mfers-owners/0.0.1",
    name: "Mfers",
    numOwners: "100"
  }
}

export default communities