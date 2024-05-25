import { IMusic } from "@/types/types";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [musicList, setMusicList] = useState<IMusic[]>([]);

    const getAllMusic = async () => {
        try {
            const res = await axiosInstance.get("/music");
            if (res.status === 200 && res.data.success === true) {
                setMusicList(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllMusic();
    }, []);

    const recentlyAddedMusic = [...musicList].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    debugger;
    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-20 h-[100%]">
                <div className="flex w-full lg:w-[70%] flex-col gap-8">
                    <div className="w-full rounded-[30px] overflow-hidden shadow-lg shadow-red-100 relative">
                        <img
                            className="w-full h-64 object-cover brightness-75 "
                            src="https://media-cdn.socastsrm.com/wordpress/wp-content/blogs.dir/2166/files/2020/01/Blinding-Lights.jpg"
                            alt="weekend"
                        />
                        <div className="p-10 absolute left-0 top-0">
                            <h4 className="text-white tracking-tight text-3xl mb-3 uppercase font-bold">
                                Blinding Lights
                            </h4>
                            <p className="text-gray-100 font-thin leading-normal">
                                Lorem ipsum dolor, sit amet cons ectetur adipis
                                icing elit. Praesen tium,
                            </p>
                        </div>
                    </div>

                    <div className="w-full">
                        <h1 className="text-3xl my-6">Popular artists</h1>
                        <div className="flex gap-5 w-full overflow-x-auto justify-between">
                            <div className="flex flex-col items-center gap-3 ">
                                <img
                                    className="w-28 h-28 rounded-full"
                                    src="https://i.discogs.com/0yrvD2ARf57J0mfwV0EdRX4MqhvNJpDtb6OoFjhO9C8/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMzE2/MTU3LTE2Mzc1MzMw/MzMtNjQ5MS5qcGVn.jpeg"
                                ></img>
                                <span>The Weekend</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    className="w-28 h-28 rounded-full"
                                    src="https://i.discogs.com/0yrvD2ARf57J0mfwV0EdRX4MqhvNJpDtb6OoFjhO9C8/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMzE2/MTU3LTE2Mzc1MzMw/MzMtNjQ5MS5qcGVn.jpeg"
                                ></img>
                                <span>The Weekend</span>
                            </div>{" "}
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    className="w-28 h-28 rounded-full"
                                    src="https://i.discogs.com/0yrvD2ARf57J0mfwV0EdRX4MqhvNJpDtb6OoFjhO9C8/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMzE2/MTU3LTE2Mzc1MzMw/MzMtNjQ5MS5qcGVn.jpeg"
                                ></img>
                                <span>The Weekend</span>
                            </div>{" "}
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    className="w-28 h-28 rounded-full"
                                    src="https://i.discogs.com/0yrvD2ARf57J0mfwV0EdRX4MqhvNJpDtb6OoFjhO9C8/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMzE2/MTU3LTE2Mzc1MzMw/MzMtNjQ5MS5qcGVn.jpeg"
                                ></img>
                                <span>The Weekend</span>
                            </div>{" "}
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    className="w-28 h-28 rounded-full"
                                    src="https://i.discogs.com/0yrvD2ARf57J0mfwV0EdRX4MqhvNJpDtb6OoFjhO9C8/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMzE2/MTU3LTE2Mzc1MzMw/MzMtNjQ5MS5qcGVn.jpeg"
                                ></img>
                                <span>The Weekend</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%] bg-gray-100 max-h-[520px] rounded-[30px] hidden lg:flex p-8 flex-col gap-3 ">
                    <h1 className="text-2xl uppercase">Recently added</h1>

                    <div className="overflow-scroll scrolbar-thin">
                        {recentlyAddedMusic?.map((music: IMusic) => (
                            <div className="flex border-b-2 py-4 justify-between flex-col">
                                <div className="w-full">
                                    <span className="uppercase font-semibold">
                                        {music.title}
                                    </span>
                                </div>
                                <span className="text-sm">
                                    {music.artist_name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="">
                <h1 className="text-3xl my-6">Top picks today</h1>

                <div className="h-[150px] overflow-scroll">
                    {musicList.map((music: IMusic) => (
                        <div className="flex border-b-2 py-4">
                            <div className="w-[40%]">
                                <span>{music.title}</span>
                            </div>
                            <div className="w-[30%]">
                                <span>{music.artist_name}</span>
                            </div>

                            <div className="w-[30%]">
                                <span>{music.genre}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
