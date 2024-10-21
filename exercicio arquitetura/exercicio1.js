class FlightBooking {
    bookFlight(customer, travelOrigin, travelDestination, travelDate) {
        // Lógica para reserva de voo
        console.log(`Reservando voo para ${customer} de ${travelOrigin} para ${travelDestination} na data ${travelDate}.`);
        return { status: "success", ticketNumber: "FL12345" };
    }
}

class HotelBooking{
    // Lógica para reserva de Hotel
    bookHotel (customer, hotelName, hoteCheckIn, hotelCheckOut){
        console.log(`Reservando hotel para ${customer} no hotel ${hotelName} de ${hoteCheckIn} até ${hotelCheckOut}.`);
            return { status: "success", confirmationNumber: "HT54321" };   
    }
}

class CarRental {
    rentCar(customer, carType, CarRentDate, CarReturnDate) {
        // Lógica para aluguel de carro
        console.log(`Alugando carro ${carType} para ${customer} de ${CarRentDate} até ${CarReturnDate}.`);
        return { status: "success", rentalId: "CR98765" };
    }
}

class TravelFacade {
    constructor() {
        this.flightBooking = new FlightBooking();
        this.hotelBooking = new HotelBooking();
        this.carRental = new CarRental();
    }
    // Resevar tudo para o cliente de uma unica vez.
    bookCompleteTrip(customer, travelOrigin, travelDestination, travelDate, hotelName, hotelCheckOut, carType, carToDate) {
        console.log("Iniciando processo de reserva completa...");

        // Reservando voo
        const flight = this.flightBooking.bookFlight(customer, travelOrigin, travelDestination, travelDate);
        if (flight.status !== "success") {
            console.log("Falha ao reservar o voo.");
            return;
        }

        // Reservando hotel no mesmo dia em que o cliente chega
        const hotel = this.hotelBooking.bookHotel(customer, hotelName, travelDate, hotelCheckOut);
        if (hotel.status !== "success") {
            console.log("Falha ao reservar o hotel.");
            return;
        }

        // Alugando carro no mesmo dia em que o cliente chega
        const car = this.carRental.rentCar(customer, carType, travelDate , carToDate);
        if (car.status !== "success") {
            console.log("Falha ao alugar o carro.");
            return;
        }

        console.log("Reserva completa feita com sucesso!");
        console.log(`Detalhes:
        - Ticket do voo: ${flight.ticketNumber}
        - Confirmação do hotel: ${hotel.confirmationNumber}
        - ID do aluguel de carro: ${car.rentalId}`);
    }
}

// Exemplo de uso
const travelFacade = new TravelFacade();

const customer = "John Doe";
const travelOrigin = "São Paulo";
const travelDestination = "Nova York";
const travelDate = "2024-12-01";
const hotelName = "The Plaza";
const hotelCheckOut = "2024-12-10";
const carType = "SUV";
const carToDate = "2024-12-10";

// Fazendo a reserva completa
travelFacade.bookCompleteTrip(customer, travelOrigin, travelDestination, travelDate, hotelName, hotelCheckOut, carType, carToDate);
