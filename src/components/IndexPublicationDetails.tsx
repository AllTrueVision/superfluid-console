import {FC, useState} from "react";
import {sfSubgraph} from "../redux/store";
import {
  createSkipPaging, Index, IndexSubscription_OrderBy,
  IndexUpdatedEvent_OrderBy,
  Ordering,
  SkipPaging
} from "@superfluid-finance/sdk-core";
import Container from "@mui/material/Container";
import {
  Box,
  Button,
  Card,
  List,
  ListItem, ListItemText, Skeleton,
  Typography
} from "@mui/material";
import IndexUpdatedEventDataGrid from "./IndexUpdatedEventDataGrid";
import DetailsDialog from "./DetailsDialog";
import SuperTokenAddress from "./SuperTokenAddress";
import AccountAddress from "./AccountAddress";
import IndexSubscriptionDataGrid from "./IndexSubscriptionDataGrid";
import SkeletonAddress from "./skeletons/SkeletonAddress";
import {Network} from "../redux/networks";

interface Props {
  network: Network;
  indexId: string
}

const IndexPublicationDetails: FC<Props> = ({network, indexId}) => {
  const indexQuery = sfSubgraph.useIndexQuery({
    chainId: network.chainId,
    id: indexId
  });

  const [indexUpdatedEventPaging, setIndexUpdatedEventPaging] = useState<SkipPaging>(createSkipPaging({
    take: 10
  }))
  const [indexUpdatedEventPagingOrdering, setIndexUpdatedEventOrdering] = useState<Ordering<IndexUpdatedEvent_OrderBy> | undefined>({
    orderBy: "timestamp",
    orderDirection: "desc"
  })
  const indexUpdatedEventQuery = sfSubgraph.useIndexUpdatedEventsQuery({
    chainId: network.chainId,
    filter: {
      index: indexId.toLowerCase()
    },
    pagination: indexUpdatedEventPaging,
    order: indexUpdatedEventPagingOrdering
  });

  const [indexSubscriptionPaging, setIndexSubscriptionPaging] = useState<SkipPaging>(createSkipPaging({
    take: 10
  }))
  const [indexSubscriptionPagingOrdering, setIndexSubscriptionOrdering] = useState<Ordering<IndexSubscription_OrderBy> | undefined>()
  const indexSubscriptionEventQuery = sfSubgraph.useIndexSubscriptionsQuery({
    chainId: network.chainId,
    filter: {
      index: indexId.toLowerCase()
    },
    pagination: indexSubscriptionPaging,
    order: indexSubscriptionPagingOrdering
  });

  const index: Index | undefined | null = indexQuery.data

  return (<Container>
    <Typography variant="h2">
      Published Index Details
    </Typography>
    <Card variant="outlined">
      <List>
        <ListItem divider>
          <ListItemText secondary="Token"
                        primary={(network && index) ? <SuperTokenAddress network={network} address={index.token}/> :
                          <SkeletonAddress/>}/>
        </ListItem>
        <ListItem divider>
          <ListItemText secondary="Publisher"
                        primary={(network && index) ? <AccountAddress network={network} address={index.publisher}/> : <SkeletonAddress/>}/>
        </ListItem>
        <ListItem divider>
          <ListItemText secondary="Total Units" primary={index ? index.totalUnits : <Skeleton sx={{width: "75px"}} />}/>
        </ListItem>
        <ListItem>
          <ListItemText secondary="Total Distributed" primary={index ? index.totalAmountDistributedUntilUpdatedAt : <Skeleton sx={{width: "75px"}} />}/>
        </ListItem>
      </List>
    </Card>
    <Card variant="outlined">
      <Typography variant="h3">
        Distributions
      </Typography>
      <IndexUpdatedEventDataGrid index={index} queryResult={indexUpdatedEventQuery}
                                 setPaging={setIndexUpdatedEventPaging}
                                 ordering={indexUpdatedEventPagingOrdering}
                                 setOrdering={setIndexUpdatedEventOrdering}/>
    </Card>
    <Card variant="outlined">
      <Typography variant="h3">
        Subscriptions
      </Typography>
      <IndexSubscriptionDataGrid network={network}
                                 queryResult={indexSubscriptionEventQuery}
                                 setPaging={setIndexSubscriptionPaging}
                                 ordering={indexSubscriptionPagingOrdering}
                                 setOrdering={setIndexSubscriptionOrdering}/>
    </Card>
  </Container>)
};

export default IndexPublicationDetails;

export const IndexPublicationDetailsDialog: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Details
      </Button>
      <DetailsDialog open={open} handleClose={handleClose}>
        <IndexPublicationDetails {...props} />
      </DetailsDialog>
    </Box>
  );
}

