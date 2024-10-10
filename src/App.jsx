/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
    seatNumber: 1,
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
    seatNumber: 2,
  },
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>
      <td>{traveller.seatNumber}</td>
    </tr>
  );
}

function Display(props) {
  /*Q3. Write code to render rows of table, each corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. Write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;

    const traveller = {
      id: Date.now(), // Generate unique id
      name: form.travellername.value,
      phone: form.travellerphone.value,
      bookingTime: new Date(),
      seatNumber: parseInt(form.seatnumber.value),
    };
    this.props.bookTraveller(traveller);
    form.travellername.value = '';
    form.travellerphone.value = '';
    form.seatnumber.value = '';
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required />
        <input type="text" name="travellerphone" placeholder="Phone" required />
        <input type="number" name="seatnumber" placeholder="Seat Number" required min="1" max="10" />
        <button>Add</button>
      </form>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const nameToDelete = form.travellername.value;
    this.props.deleteTraveller(nameToDelete);
    form.travellername.value = '';
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <h2>Seat Availability</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', maxWidth: '200px' }}>
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: this.props.travellers.some(traveller => traveller.seatNumber === index + 1)
                  ? 'grey'
                  : 'green',
              }}
            ></div>
          ))}
        </div>
        <p>Total Free Seats: {10 - this.props.travellers.length}</p>
        <div style={{ marginTop: '20px' }}>
          <p><span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'green' }}></span> Available Seat</p>
          <p><span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'grey' }}></span> Reserved Seat</p>
        </div>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 'homepage' }; // Default selector is 'homepage'
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    if (this.state.travellers.length < 10) {
      if (this.state.travellers.some(traveller => traveller.seatNumber === passenger.seatNumber)) {
        alert('This seat number is already booked. Please choose another seat.');
        return;
      }
      this.setState(prevState => ({
        travellers: [...prevState.travellers, passenger]
      }));
    } else {
      alert('All seats are booked. Cannot add more travellers.');
    }
  }

  deleteTraveller(name) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const travellerExists = this.state.travellers.some(traveller => traveller.name === name);
  
    if (!travellerExists) {
      alert('Traveller not found. Please check the name and try again.');
      return;
    }

    // Proceed to delete the traveller
    this.setState(prevState => ({
      travellers: prevState.travellers.filter(traveller => traveller.name !== name)
    }));
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button onClick={() => this.setSelector('homepage')}>Home</button>
          <button onClick={() => this.setSelector('display')}>Display Travellers</button>
          <button onClick={() => this.setSelector('add')}>Add Traveller</button>
          <button onClick={() => this.setSelector('delete')}>Delete Traveller</button>
        </div>

        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 'homepage' && <Homepage travellers={this.state.travellers} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 'display' && <Display travellers={this.state.travellers} />}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 'add' && <Add bookTraveller={this.bookTraveller} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 'delete' && <Delete deleteTraveller={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));