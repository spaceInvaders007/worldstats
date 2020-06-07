import React from "react";
// import countries from "../Data/countries";

interface OwnState {
  countries: Array<string>;
}

class RenderCountries extends React.PureComponent<OwnState> {
  public state = {
    countries: [],
  };

  async componentDidMount() {
    try {
      const response = await fetch("/countries");
      let countries = [];
      const countriesData = await response.json();
      // console.log(typeof countries, "this is typeof");
      for (let i = 0; i < countriesData.length; i++) {
        countries.push(countriesData[i].Name);
      }
      this.setState({
        countries,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    //console.log(this.state.countries, "these are the countries");
    return (
      <div>
        {this.state.countries.map((c) => (
          <div key={c}>{c}</div>
        ))}
      </div>
    );
  }
}

export default RenderCountries;
