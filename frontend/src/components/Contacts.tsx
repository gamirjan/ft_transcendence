import React from "react"
import { Layout } from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';


const Contacts = () => {
    return (
        <Layout>
             <div className="grid grid-cols-1 md:grid-cols-2 flex justify-center">
               <div className="">
                <ul className="max-w-xl divide-y divide-gray-200 dark:divide-gray-700 mt-20 ml-20 mr-20">
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">

                            <div className="flex-1 min-w-0">
                                <p className="text-2xl font-medium text-gray-700 truncate dark:text-black">
                                Friends List
                                </p>

                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                            Win Ratio
                            </div>
                        </div>
                    </li>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img src={profile}  className="w-8 h-8 rounded-full"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 truncate dark:text-black">
                                Arno Baboomian
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-900">
                                arbaboom
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                56%
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={profile}/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                                Vruyr Sargsyan
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-900">
                                vrsargsy
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                97%
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={profile} alt="Neil image"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                                Gevorg Amirjanyan
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-900">
                                gamirjan
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                75%
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={profile} alt="Neil image"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                                Arman Kazaryan
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-900">
                                armanarut
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                46%
                            </div>
                        </div>
                    </li>
                    <li className="pt-3 pb-0 sm:pt-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={profile} alt="Neil image"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                                Edgar Shakhgeldyan
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-900">
                                eshakhge
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                50%
                            </div>
                        </div>
                    </li>
                    </ul>
                </div>
                <div className="">
                    <ul className=" max-w-xl divide-y divide-gray-200 dark:divide-gray-700 mt-20 ml-20 mr-20">
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">

                            <div className="flex-1 min-w-0">
                                <p className="text-2xl font-medium text-gray-700 truncate dark:text-black">
                                Black List
                                </p>

                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                            Win Ratio
                            </div>
                        </div>
                    </li>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img src={profile}  className="w-8 h-8 rounded-full"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 truncate dark:text-black">
                                Hovhannes Vardanyan
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-900">
                                hvardany
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                98%
                            </div>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Contacts;