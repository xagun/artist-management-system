import { IMusic } from "@/types/types";
import axiosInstance from "@/utils/AxiosInstance";
import { HeartIcon } from "lucide-react";
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

    const randomPicks = (nums: number) => {
        const arrayCopy = [...musicList];

        for (let i = arrayCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        }

        return arrayCopy.slice(0, nums);
    };

    return (
        <div className="flex flex-col gap-4 overflow-scroll h-full">
            <div className="flex gap-20 h-[100%]">
                <div className="flex w-full lg:w-[70%] flex-col gap-6">
                    <div className="w-full rounded-[30px] overflow-hidden shadow-lg shadow-red-100 relative">
                        <img
                            className="w-full h-40 sm:h-56  object-cover brightness-75 "
                            src="https://media-cdn.socastsrm.com/wordpress/wp-content/blogs.dir/2166/files/2020/01/Blinding-Lights.jpg"
                            alt="weekend"
                        />
                        <div className="p-6 sm:p-10 absolute left-0 top-0 flex flex-col justify-between h-full ">
                            <h4 className="text-white tracking-tight text-xl sm:text-3xl uppercase font-bold">
                                Blinding Lights
                            </h4>
                            <p className="text-white font-light leading-normal text-sm ">
                                The Weeknd Told Us What 'Blinding Lights' Really
                                Means. He Does Not Advocate Doing It.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
                                    <HeartIcon className="text-white h-5" />
                                </div>
                                <span className="text-xs text-white font-semibold">
                                    {" "}
                                    2.5 M+ likes
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <h1 className="text-2xl my-6">Popular artists</h1>
                        <div className="flex w-full overflow-x-auto overflow-y-hidden justify-between gap-3">
                            <div className="flex flex-col items-center gap-3 flex-none">
                                <img
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                    src="https://static01.nyt.com/images/2024/04/08/multimedia/08xp-jcole/08xp-jcole-videoSixteenByNineJumbo1600.jpg"
                                ></img>
                                <span className="text-xs sm:text-[14px] text-center">
                                    J. Cole
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-3 flex-none">
                                <img
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                    src="https://i.discogs.com/0yrvD2ARf57J0mfwV0EdRX4MqhvNJpDtb6OoFjhO9C8/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMzE2/MTU3LTE2Mzc1MzMw/MzMtNjQ5MS5qcGVn.jpeg"
                                ></img>
                                <span className="text-xs sm:text-[14px]">
                                    The Weekend
                                </span>
                            </div>{" "}
                            <div className="flex flex-col items-center gap-3 flex-none">
                                <img
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                    src="https://wallpapers.com/images/featured/xxxtentacion-oqmpwpzjp4prpxan.jpg"
                                ></img>
                                <span className="text-xs sm:text-[14px]">
                                    XXXTentacion
                                </span>
                            </div>{" "}
                            <div className="flex flex-col items-center gap-3 flex-none">
                                <img
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                    src="https://thefader-res.cloudinary.com/images/w_1440,c_limit,f_auto,q_auto:eco/arjml6zonrftniqprqbm/wiz-khalifa.jpg"
                                ></img>
                                <span className="text-xs sm:text-[14px]">
                                    Wiz Khalife
                                </span>
                            </div>{" "}
                            <div className="flex flex-col items-center gap-3 flex-none">
                                <img
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                    src="https://images-r2.thebrag.com/td/uploads/2019/11/fkatwigs-5-768x435.jpg"
                                ></img>
                                <span className="text-xs sm:text-[14px]">
                                    Bellie Eilish
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%] bg-zinc-100 shadow-sm max-h-[470px] rounded-[30px] hidden lg:flex p-8 flex-col gap-3 ">
                    <h1 className="text-xl uppercase tracking-wider">
                        Recently added
                    </h1>

                    <div className="overflow-scroll scrolbar-thin">
                        {recentlyAddedMusic.length > 0
                            ? recentlyAddedMusic?.map((music: IMusic, idx) => (
                                  <div
                                      key={idx}
                                      className="flex border-b-2 py-4 justify-between flex-col"
                                  >
                                      <div className="w-full">
                                          <span className="font-normal">
                                              {music.title}
                                          </span>
                                      </div>
                                      <span className="text-sm">
                                          {music.artist_name}
                                      </span>
                                  </div>
                              ))
                            : "No music found"}
                    </div>
                </div>
            </div>

            <div className="h-full">
                <h1 className="text-2xl my-6">Top picks today</h1>

                <div className="h-full overflow-y-auto text-sm">
                    {randomPicks(7).length > 0
                        ? randomPicks(7).map((music: IMusic, key) => (
                              <div
                                  key={key}
                                  className="flex border-b-2 py-4 justify-between"
                              >
                                  <div className="w-[40%]">
                                      <span className="font-semibold">
                                          {music.title}
                                      </span>
                                  </div>
                                  <div className="w-[30%]">
                                      <span className="font-normal">
                                          {music.artist_name}
                                      </span>
                                  </div>

                                  <div className="w-[30%] hidden md:flex">
                                      <span className="font-normal capitalize">
                                          {music.genre}
                                      </span>
                                  </div>
                              </div>
                          ))
                        : "No picks today"}
                </div>
            </div>
        </div>
    );
}
