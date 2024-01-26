"use client";
import React, { useState } from "react";
import { Grid, Tooltip } from "@gib-ui/core";
import { Icons } from "@gib-ui/icons";
import Link from "next/link";
import { Locale } from "@/root/i18n.config";
import { SearchLayout, SearchList, mockList } from "./";

interface List {
    list: string[];
    limitDisplay: boolean;
}

const Search = ({ lang }: { lang: Locale }) => {
    const [favorites, setFavorites] = useState<List>({
        list: mockList.slice(0, 10),
        limitDisplay: true
    });
    const [cardList, setCardList] = useState<List>({
        list: [...mockList],
        limitDisplay: true
    });

    const handleItemClick = (clickedIndex: number) => {
        setFavorites((prevState: List) => ({
            ...prevState,
            list: prevState.list.filter((_, index) => index !== clickedIndex)
        }));
    };

    const handleCardItemClick = (item: string) => {
        setFavorites((prevState: List) => {
            const newList = prevState.list.includes(item)
                ? prevState.list.filter((favItem: string) => favItem !== item)
                : [...prevState.list, item];
            return { ...prevState, list: newList };
        });
    };

    const handleExpand = (title: string) => {
        const updateLimitDisplay = (prevState: List) => ({
            ...prevState,
            limitDisplay: !prevState.limitDisplay
        });
        const setState = title === "Favoriler" ? setFavorites : setCardList;
        setState((prevState: List) => updateLimitDisplay(prevState));
    };

    const favoritesItem = () =>
        favorites.list
            .slice(0, favorites.limitDisplay ? 15 : favorites.list.length)
            .map((item: string, index: number) => (
                <Grid
                    key={index}
                    item
                    sx={{
                        display: "flex",
                        columnGap: "10px",
                        cursor: "pointer"
                    }}
                >
                    <Grid item onClick={() => handleItemClick(index)}>
                        <Tooltip title="Favorilerden kaldır">
                            <Icons.StarBorder sx={{ color: "gold" }} />
                        </Tooltip>
                    </Grid>
                    <Link href={`/${lang}/portal/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                        {item}
                    </Link>
                </Grid>
            ));

    const cardItem = () =>
        cardList.list
            .slice(0, cardList.limitDisplay ? 15 : cardList.list.length)
            .map((item: string, index: number) => (
                <Grid
                    key={index}
                    item
                    sx={{
                        display: "flex",
                        columnGap: "30px",
                        justifyContent: "space-between",
                        p: "30px",
                        borderRadius: "5px",
                        boxShadow: "0px 3px 15px 0px rgba(0, 0, 0, 0.15)"
                    }}
                >
                    <Link href={`/${lang}/portal/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                        {item}
                    </Link>
                    <Grid item onClick={() => handleCardItemClick(item)}>
                        <Icons.StarBorder
                            sx={{
                                color: favorites.list.includes(item) ? "gold" : "gray",
                                cursor: "pointer"
                            }}
                        />
                    </Grid>
                </Grid>
            ));

    return (
        <SearchLayout>
            <>
                <SearchList
                    title="Favoriler"
                    width="285"
                    limit={favorites.limitDisplay}
                    handleExpand={handleExpand}
                >
                    {favoritesItem()}
                </SearchList>
                <SearchList
                    title="Kategori"
                    width="250"
                    limit={cardList.limitDisplay}
                    handleExpand={handleExpand}
                >
                    {cardItem()}
                </SearchList>
            </>
        </SearchLayout>
    );
};

export default Search;
