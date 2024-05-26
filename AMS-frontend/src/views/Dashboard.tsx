import { IArtist, IMusic } from "@/types/types";
import axiosInstance from "@/utils/AxiosInstance";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [musicList, setMusicList] = useState<IMusic[]>([]);
    const [allArtists, setAllArtists] = useState<IArtist[]>([]);

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
        getAllArtist();
    }, []);

    const recentlyAddedMusic = [...musicList].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const randomPicks = (array: any, nums: number) => {
        const arrayCopy = [...array];

        for (let i = arrayCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        }

        return arrayCopy.slice(0, nums);
    };

    const getAllArtist = async () => {
        try {
            const res = await axiosInstance.get("/artist");
            if (res.status === 200 && res.data.success === true) {
                setAllArtists(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
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
                            {allArtists.length > 0
                                ? randomPicks(allArtists, 6).map(
                                      (artist, key) => (
                                          <div
                                              key={key}
                                              className="flex flex-col items-center gap-3 flex-none"
                                          >
                                              <img
                                                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                                  src={
                                                      artist.image ||
                                                      "fallback.png"
                                                  }
                                              />
                                              <span className="text-xs sm:text-[14px] text-center">
                                                  {artist.name}
                                              </span>
                                          </div>
                                      )
                                  )
                                : "No records found"}
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
                    {musicList.length > 0
                        ? randomPicks(musicList, 5).map(
                              (music: IMusic, key) => (
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
                              )
                          )
                        : "No picks today"}
                </div>
            </div>
        </div>
    );
}
