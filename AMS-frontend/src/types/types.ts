export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    gender: 'm' | 'f' | 'o';
    address: string;
    phone: string;
  }


  export interface IArtist {
    address: string;
    dob: string;
    first_release_year: string;
    gender: string;
    id: number;
    name: string;
    no_of_albums_released: number;
    image:string
  }



export interface IMusic {
    id: number;
    artist_id: number;
    title: string;
    album_name: string;
    genre: string;
    artist_name: string;
    created_at:string
}
